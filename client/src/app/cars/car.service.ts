import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private readonly http = inject(HttpClient);
  private readonly api = '/api/cars';

  list(): Observable<Car[]> {
    return this.http.get<Car[]>(this.api);
  }
  get(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.api}/${id}`);
  }
  create(car: Car): Observable<Car> {
    return this.http.post<Car>(this.api, car);
  }
  update(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.api}/${id}`, car);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
