package sj.sbRestApiWithAngular.demo.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import sj.sbRestApiWithAngular.demo.entity.Car;
import sj.sbRestApiWithAngular.demo.repository.CarRepository;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "${app.cors.allowed-origin:http://localhost:4200}")
public class CarController {
    private final CarRepository repository;

    public CarController(CarRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Car> list() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Car get(@PathVariable Long id) {
        return find(id);
    }

    @PostMapping
    public ResponseEntity<Car> create(@Valid @RequestBody Car car) {
        Car saved = repository.save(car);
        return ResponseEntity.created(URI.create("/api/cars/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public Car update(@PathVariable Long id, @Valid @RequestBody Car changes) {
        Car car = find(id);
        car.setName(changes.getName());
        return repository.save(car);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(NOT_FOUND, "Car not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private Car find(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Car not found"));
    }
}
