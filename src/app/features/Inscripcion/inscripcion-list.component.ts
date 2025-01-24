import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionService } from '../../core/Services/InscriptionService.service';
import { MenuComponent } from "../../Shared/Menu/menu/menu.component";
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-list',
  standalone: true,
  imports: [CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './inscription-list.component.html',
})
export class InscriptionListComponent implements OnInit {
  eventos: any[] = [];
  errorMessage: string = '';

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.inscriptionService.obtenerEventosFiltrados().subscribe({
      next: (response) => {
        this.eventos = response.resultado || response; // Ajustar según el formato de la respuesta
      },
      error: (err) => {
        console.error('Error al cargar eventos:', err);
        this.errorMessage = 'No se pudo cargar la lista de eventos.';
      },
    });
  }

  inscribirse(eventoId: number): void {
    this.inscriptionService.registrarInscripcion(eventoId).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Inscripción exitosa!',
          text: 'Te has inscrito al evento con éxito.',
        });
        this.cargarEventos();
      },
      error: (err) => {
        console.error('Error al inscribirse al evento:', err);

        if (err.error && err.error.mensaje === 'No puedes inscribirte a un evento que tú mismo has creado.') {
          Swal.fire({
            icon: 'warning',
            title: 'No permitido',
            text: 'No puedes inscribirte a un evento que tú mismo has creado.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No puedes inscribirte a un evento que tú mismo has creado.',
          });
        }
      },
    });
  }

}
