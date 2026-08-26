/**
 * 
 */
package sj.sbRestApiWithAngular.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sj.sbRestApiWithAngular.demo.entity.Car;

/**
 * @author saurabh.jaju
 *
 */
public interface CarRepository extends JpaRepository<Car, Long> {

}
