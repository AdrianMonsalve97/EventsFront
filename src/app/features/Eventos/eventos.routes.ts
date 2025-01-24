import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/Guards/AuthGuard';

export const eventosRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./event-list.component').then((c) => c.EventListComponent) 
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./event-create.component').then((c) => c.EventCreateComponent),
  },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./event-detail.component').then((c) => c.EventDetailComponent),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./event-edit.component').then((c) => c.EditarEventoComponent),
    canActivate: [AuthGuard]
  },
];
