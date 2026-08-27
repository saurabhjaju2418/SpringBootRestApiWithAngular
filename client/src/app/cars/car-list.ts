import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from './car.model';
import { CarService } from './car.service';

@Component({
  selector: 'app-car-list',
  imports: [RouterLink],
  template: `
    <div class="page-heading">
      <div>
        <h1>Cars</h1>
        <p>A modern Angular and Spring Boot CRUD example.</p>
      </div>
      <a class="button" routerLink="/cars/new">Add car</a>
    </div>
    @if (loading()) {
      <p>Loading…</p>
    } @else if (error()) {
      <p class="error">{{ error() }}</p>
    } @else {
      <div class="grid">
        @for (car of cars(); track car.id) {
          <article class="card">
            <h2>{{ car.name }}</h2>
            <div class="actions">
              <a [routerLink]="['/cars', car.id]">Edit</a
              ><button type="button" (click)="remove(car)">Delete</button>
            </div>
          </article>
        } @empty {
          <p>No cars yet.</p>
        }
      </div>
    }
  `,
})
export class CarList implements OnInit {
  private readonly service = inject(CarService);
  readonly cars = signal<Car[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit(): void {
    this.load();
  }
  remove(car: Car): void {
    if (car.id === undefined || !confirm(`Delete ${car.name}?`)) return;
    this.service
      .delete(car.id)
      .subscribe({
        next: () => this.cars.update((cars) => cars.filter((item) => item.id !== car.id)),
        error: () => this.error.set('Unable to delete the car.'),
      });
  }
  private load(): void {
    this.service.list().subscribe({
      next: (cars) => {
        this.cars.set(cars);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load cars.');
        this.loading.set(false);
      },
    });
  }
}
