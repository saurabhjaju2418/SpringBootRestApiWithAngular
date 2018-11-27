/**
 * 
 */
package sj.sbRestApiWithAngular.demo.entity;

import javax.persistence.*;

import lombok.*;

/**
 * @author saurabh.jaju
 *
 */
@Data
@Entity
@NoArgsConstructor
public class Car {

	@Id @GeneratedValue
    private Long id;
    private @NonNull String name;
}
