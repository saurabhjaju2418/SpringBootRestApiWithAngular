/**
 * 
 */
package sj.sbRestApiWithAngular.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import sj.sbRestApiWithAngular.demo.entity.Car;

/**
 * @author saurabh.jaju
 *
 */
@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface CarRepository extends JpaRepository<Car, Long> {

}
