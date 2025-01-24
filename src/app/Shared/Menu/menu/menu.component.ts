import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/services/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports:[CommonModule,ReactiveFormsModule]
})
export class MenuComponent {
  // Estado de los dropdowns
  dropdownEventosOpen = false;
  dropdownEmpresaOpen = false;
  dropdownUsuariosOpen = false;
  dropdownInscripcionesOpen = false;


  constructor(private router: Router, private authService: AuthService) {}

  // Función para manejar el logout
  logout(): void {
    this.router.navigate(['/login']);  // Redirigimos al login
  }

  // Funciones para manejar la navegación a eventos
  onCrearEvento() {
    this.router.navigate(['/events/crear']);
  }
  onListarEventos() {
    this.router.navigate(['/events']);
  }

  // Funciones para manejar la empresa
  onCrearEmpresa() {
    this.router.navigate(['/crear-empresa']);
  }
  onListarEmpresas() {
    this.router.navigate(['/listar-empresas']);
  }

  // Funciones para manejar usuarios
  onCrearUsuarios() {
    this.router.navigate(['/crear-usuario']);
  }
  onListarUsuarios() {
    this.router.navigate(['/listar-usuarios']);
  }
  onEditarUsuarios() {
    this.router.navigate(['/editar-usuario']);
  }
  onCrearInscripcion() {
    this.router.navigate(['/crear-inscripcion']);
  }

  onListarInscripciones() {
    this.router.navigate(['/listar-inscripciones']);
  }

  // Funciones para alternar la visibilidad de cada dropdown
  toggleDropdownEventos() {
    this.dropdownEventosOpen = !this.dropdownEventosOpen;
    this.dropdownEmpresaOpen = false;  // Cerrar otros dropdowns
    this.dropdownUsuariosOpen = false;
  }

  toggleDropdownEmpresa() {
    this.dropdownEmpresaOpen = !this.dropdownEmpresaOpen;
    this.dropdownEventosOpen = false;  // Cerrar otros dropdowns
    this.dropdownUsuariosOpen = false;
  }

  toggleDropdownUsuarios() {
    this.dropdownUsuariosOpen = !this.dropdownUsuariosOpen;
    this.dropdownEventosOpen = false;  // Cerrar otros dropdowns
    this.dropdownEmpresaOpen = false;
  }
  toggleDropdownInscripciones() {
    this.dropdownInscripcionesOpen = !this.dropdownInscripcionesOpen;
    this.dropdownEventosOpen = false;  // Cerrar otros dropdowns
    this.dropdownEmpresaOpen = false;
    this.dropdownUsuariosOpen = false;
  }
}
