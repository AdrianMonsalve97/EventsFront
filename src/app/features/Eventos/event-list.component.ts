import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../api/services/event.service';
import { EventoFiltroDto } from '../../api/models/evento-filtro-dto';
import { Evento } from '../../api/models/evento';
import { ApiEventFiltrarPost$Params } from '../../api/fn/event/api-event-filtrar-post';
import { MenuComponent } from "../../Shared/Menu/menu/menu.component";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  private readonly eventService = inject(EventService);
  private readonly fb = inject(FormBuilder);

  filtroForm: FormGroup;
  eventos: Evento[] = [];
  errorMessage: string | null = null;
  eventForm: FormGroup = this.fb.group({
    id: [null],
    nombre: [''],
    descripcion: [''],
    fechaHora: [''],
    ubicacion: [''],
    capacidadMaxima: [null],
    prioridad: [''],
    fechas: this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
      fechaAsignacion: [''],
      fechaCotizacion: [''],
      fechaAprovacion: [''],
    })
  });

  constructor(
    private readonly router: Router 

  ) {
    this.filtroForm = this.fb.group({
      nombre: [''],
      ubicacion: [''],
      fechaHora: [''],
      capacidadMaxima: [null],
    });
  }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(filtro: EventoFiltroDto = {}): void {
    const params: ApiEventFiltrarPost$Params = {
      body: {
        nombre: filtro.nombre,
        ubicacion: filtro.ubicacion,
        fechaHora: filtro.fechaHora ? new Date(filtro.fechaHora).toISOString() : null,
        capacidadMaxima: filtro.capacidadMaxima,
      },
    };
    this.eventService.apiEventFiltrarPost(params).subscribe(
      {
        next: (eventos) => {
          this.eventos = eventos;
        },
        error: (err) => {}
      }
    )
  }

  aplicarFiltro(): void {
    const filtro = this.filtroForm.value as EventoFiltroDto;
    this.cargarEventos(filtro);
  }

  borrarEvento(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
        if (confirmButton) {
          confirmButton.style.backgroundColor = '#e63946';
          confirmButton.style.color = 'white';
        }
        if (cancelButton) {
          cancelButton.style.backgroundColor = '#457b9d';
          cancelButton.style.color = 'white';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.apiEventBorrareventoIdDelete$Response({ id }).subscribe({
          next: (response: any) => {
            // Aseguramos que la respuesta tenga la estructura de RespuestaGeneral
            if (response && response.body && response.body.error !== undefined) {
              if (response.body.error) {
                // Si error es true, mostrar el mensaje de error
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'error',
                  title: response.body.RespuestaGeneral.mensaje,  // Mostrar el mensaje de error
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
              } else {
                // Si error es false, mostrar mensaje de éxito
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'success',
                  title: 'El evento ha sido eliminado correctamente.',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
                this.cargarEventos(); // Actualizar la lista
              }
            } else {
              // Si la respuesta no tiene la estructura esperada
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'No se puede eliminar el evento porque tiene asistentes inscritos.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
            }
          },
          error: (err) => {
            // Manejar error en la solicitud
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'No se pudo eliminar el evento.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            console.error(err);
          },
        });
      }
    });
  }
  
  
  
  redirigirAEditarEvento(id: number): void {
    this.router.navigate([`/editar/${id}`]); 
  
  
  }
}
