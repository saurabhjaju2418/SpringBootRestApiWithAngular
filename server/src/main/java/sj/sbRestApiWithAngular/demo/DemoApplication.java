package sj.sbRestApiWithAngular.demo;

import java.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import sj.sbRestApiWithAngular.demo.entity.Car;
import sj.sbRestApiWithAngular.demo.repository.CarRepository;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Bean
    ApplicationRunner init(CarRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                    new Car("Ferrari"), new Car("Jaguar"), new Car("Porsche"),
                    new Car("Lamborghini"), new Car("Bugatti")
                ));
            }
        };
    }
}
