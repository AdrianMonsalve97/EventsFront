import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/AuthGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },

  {
    path: 'events',
    loadChildren: () => import('./Eventos/eventos.routes').then((m) => m.eventosRoutes),
    canActivate: [AuthGuard],
  },

  {
    path: 'inscriptions',
    loadComponent: () => import('./Inscripcion/inscripcion-list.component').then((c) => c.InscriptionListComponent),
    canActivate: [AuthGuard],
  },

  {
    path: 'users',
    loadComponent: () => import('./usuarios/user-list.component').then((c) => c.UserListComponent),
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'login' },
];
