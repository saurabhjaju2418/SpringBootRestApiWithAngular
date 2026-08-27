import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Car } from './car.model';
import { CarService } from './car.service';

@Component({
  selector: 'app-car-form',
  imports: [FormsModule, RouterLink],
  template: `
    <h1>{{ carId() === undefined ? 'Add car' : 'Edit car' }}</h1>
    <form (ngSubmit)="save()" #form="ngForm">
      <label for="name">Name</label>
      <input id="name" name="name" [(ngModel)]="car.name" required maxlength="120" />
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <div class="actions">
        <button class="button" [disabled]="form.invalid || saving()">
          {{ saving() ? 'Saving…' : 'Save' }}</button
        ><a routerLink="/cars">Cancel</a>
      </div>
    </form>
  `,
})
export class CarForm implements OnInit {
  readonly id = input<string>();
  private readonly service = inject(CarService);
  private readonly router = inject(Router);
  readonly saving = signal(false);
  readonly error = signal('');
  car: Car = { name: '' };
  carId = () => (this.id() ? Number(this.id()) : undefined);

  ngOnInit(): void {
    const id = this.carId();
    if (id !== undefined)
      this.service
        .get(id)
        .subscribe({
          next: (car) => (this.car = car),
          error: () => this.error.set('Unable to load the car.'),
        });
  }
  save(): void {
    this.saving.set(true);
    const id = this.carId();
    const request =
      id === undefined ? this.service.create(this.car) : this.service.update(id, this.car);
    request.subscribe({
      next: () => void this.router.navigate(['/cars']),
      error: () => {
        this.error.set('Unable to save the car.');
        this.saving.set(false);
      },
    });
  }
}
