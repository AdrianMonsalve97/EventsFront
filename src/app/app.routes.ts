import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/AuthGuard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'events',
    loadChildren: () => import('./Eventos/eventos.routes').then((m) => m.eventosRoutes),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
