import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CarService {
  public API = '//localhost:8080';
  public CAR_API = this.API + '/cars';

  constructor(private http:HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-cars');
  }

  getCarById(id: String): Observable<any> {
    return this.http.get(this.CAR_API + '/' + id);
  }

  saveCar(car: any): Observable<Object> {
    let result: Observable<Object>;
    if(car['href']){
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.CAR_API, car);
    }
    return  result;
  }

  deleteCar(id: string){
    return this.http.delete(id);
  }
}
