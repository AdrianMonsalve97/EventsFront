import { Routes } from '@angular/router';
import { AuthGuard } from './core/Guards/AuthGuard';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'events',
    loadChildren: () => import('./features/Eventos/eventos.routes').then((m) => m.eventosRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('./features/Inscripcion/inscripcion.routes').then((m) => m.inscripcionRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./features/usuarios/usuarios.routes').then((m) => m.usuariosRoutes),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
