import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Evento } from '../../api/models/evento';
import { Prioridad } from '../../api/models';
import { ApiEventCreareventoPost$Params } from '../../api/fn/event/api-event-crearevento-post';
import { EventService } from '../../api/services';
// Asegúrate de importar correctamente el tipo

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-create.component.html',
})
export class EventCreateComponent {
  eventForm: FormGroup;

  // Signals para manejar el estado
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private readonly fb: FormBuilder, private readonly eventService: EventService) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidadMaxima: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    this.errorMessage.set(null); // Resetear el mensaje de error

    if (this.eventForm.valid) {
      const evento: Evento = {
        nombre: this.eventForm.get('nombre')?.value,
        descripcion: this.eventForm.get('descripcion')?.value,
        fechaHora: this.eventForm.get('fechaHora')?.value,
        ubicacion: this.eventForm.get('ubicacion')?.value,
        capacidadMaxima: this.eventForm.get('capacidadMaxima')?.value,
        prioridad: Prioridad.$1, // Asegúrate que Prioridad.$1 es válido según el tipo de Prioridad
      };

      // Crear el objeto de parámetros para el servicio
      const params: ApiEventCreareventoPost$Params = {
        body: evento,
      };

      this.isSubmitting.set(true);

      // Llamar al servicio con los parámetros
      this.eventService.apiEventCreareventoPost(params).subscribe({
        next: () => {
          this.eventForm.reset(); // Resetear el formulario tras el envío exitoso
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
          this.errorMessage.set('Ocurrió un error al intentar crear el evento.');
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.errorMessage.set('Por favor, completa todos los campos requeridos.');
    }
  }
}
