import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/Guards/AuthGuard';

export const inscripcionRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./inscripcion-list.component').then((c) => c.InscriptionListComponent) 
  }
 
];
