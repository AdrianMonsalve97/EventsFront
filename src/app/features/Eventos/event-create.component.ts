import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EventService } from '../../api/services';
import { AuthenticacionService } from '../../core/Services/AuthenticacionService.service';
import { MenuComponent } from '../../Shared/Menu/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  imports: [ReactiveFormsModule, CommonModule, MenuComponent],
})
export class EventCreateComponent {
  eventForm: FormGroup;
  usuarioCreadorId: number;
  usuarioCreadorNombre: string;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private authService: AuthenticacionService
  ) {
    // Crear el formulario reactivo
    this.eventForm = this.fb.group({
      id: [0], // Por defecto en 0
      nombre: ['' ],
      descripcion: [''],
      fechaHora: [new Date().toISOString()],
      ubicacion: [''],
      capacidadMaxima: [0],
      prioridad: [1],
      fechas: this.fb.group({
        fechaInicio: [new Date().toISOString()],
        fechaFin: [new Date().toISOString()],
        fechaAsignacion: [new Date().toISOString()],
        fechaCotizacion: [new Date().toISOString()],
        fechaAprovacion: [new Date().toISOString()],
      }),
    });

    // Obtenemos el usuario creador
    this.usuarioCreadorId = this.authService.getUserId();
    this.usuarioCreadorNombre = this.authService.getUserName();
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.eventForm.valid) {
      const evento = this.createEventoObject();
      this.eventService.apiEventCreareventoPost({ body: evento }).subscribe({
        next: () => this.onSubmitSuccess(),
        error: (err) => this.onSubmitError(err),
      });
    } else {
      this.showErrorTooltip('Por favor, completa todos los campos requeridos.');
    }
  }

  // Crear objeto del evento con el formato requerido
  private createEventoObject() {
    const formValues = this.eventForm.value;

    return {
      id: formValues.id,
      nombre: formValues.nombre,
      descripcion: formValues.descripcion,
      fechaHora: formValues.fechaHora,
      ubicacion: formValues.ubicacion,
      capacidadMaxima: formValues.capacidadMaxima,
      asistentesRegistrados: 0, // Inicializar en 0
      prioridad: formValues.prioridad,
      fechas: {
        fechaInicio: formValues.fechas.fechaInicio,
        fechaFin: formValues.fechas.fechaFin,
        fechaAsignacion: formValues.fechas.fechaAsignacion,
        fechaCotizacion: formValues.fechas.fechaCotizacion,
        fechaAprovacion: formValues.fechas.fechaAprovacion,
      },
      usuarioCreadorId: this.usuarioCreadorId,
      usuarioCreadorNombre: this.usuarioCreadorNombre,
    };
  }

  // Éxito al crear el evento
  private onSubmitSuccess(): void {
    this.showSuccessToast('El evento se ha creado exitosamente.');
    this.eventForm.reset(); // Limpiar el formulario
  }

  // Error al crear el evento
  private onSubmitError(err: any): void {
    console.error('Error al crear el evento:', err);
    this.showErrorTooltip('Ocurrió un error al intentar crear el evento.');
  }

  // Mostrar toast de éxito
  private showSuccessToast(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Evento creado',
      text: message,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  }

  // Mostrar tooltip de error
  private showErrorTooltip(message: string): void {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: message,
      showConfirmButton: false,
      timer: 3000,
      position: 'top-end',
      toast: true,
    });
  }
  
}
