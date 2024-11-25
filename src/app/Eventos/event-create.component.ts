import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../api/api/event.service';
import { Evento } from '../api/model/evento'; // Modelo generado por OpenAPI
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-create.component.html',
})
export class EventCreateComponent {
  eventForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidadMaxima: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    this.errorMessage = null; // Resetear el mensaje de error
    if (this.eventForm.valid) {
      const evento: Evento = {
        nombre: this.eventForm.get('nombre')?.value,
        descripcion: this.eventForm.get('descripcion')?.value,
        fechaHora: this.eventForm.get('fechaHora')?.value,
        ubicacion: this.eventForm.get('ubicacion')?.value,
        capacidadMaxima: this.eventForm.get('capacidadMaxima')?.value,
      };

      this.isSubmitting = true;

      this.eventService.apiEventCreareventoPost(evento).subscribe({
        next: (response) => {
          console.log('Evento creado con éxito:', response);
          this.eventForm.reset(); // Resetear el formulario tras el envío exitoso
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
          this.errorMessage = 'Ocurrió un error al intentar crear el evento.';
          this.isSubmitting = false;
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }
}
