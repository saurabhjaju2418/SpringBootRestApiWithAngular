import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars' },
  { path: 'cars', loadComponent: () => import('./cars/car-list').then((m) => m.CarList) },
  { path: 'cars/new', loadComponent: () => import('./cars/car-form').then((m) => m.CarForm) },
  { path: 'cars/:id', loadComponent: () => import('./cars/car-form').then((m) => m.CarForm) },
  { path: '**', redirectTo: 'cars' },
];
