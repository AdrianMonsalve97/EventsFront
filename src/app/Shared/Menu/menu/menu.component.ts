import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/services/auth.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports:[ReactiveFormsModule]
})
export class MenuComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Función para manejar el logout
  logout(): void {
    //this.authService.logout();  // Llamamos al servicio de logout para borrar el token
    this.router.navigate(['/login']);  // Redirigimos al login
  }

  // Función para manejar la inscripción a un evento
  onInscribirse() {
    this.router.navigate(['/inscribirse-evento']);
  }

  // Función para crear un evento
  onCrearEvento() {
    this.router.navigate(['/crear-evento']);
  }

  // Función para listar los eventos
  onListarEventos() {
    this.router.navigate(['/listar-eventos']);
  }
}
