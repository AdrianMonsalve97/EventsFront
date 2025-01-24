import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/Guards/AuthGuard';

export const usuariosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-list.component').then((c) => c.UserListComponent),
  },



];
