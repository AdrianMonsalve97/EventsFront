import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../api/services/event.service';
import { Evento } from '../../api/models/evento';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  templateUrl: './event-edit.component.html',
  imports: [ReactiveFormsModule]
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup;
  eventId: number | null = null;
  event: Evento | null = null;
  errorMessage: string | null = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidadMaxima: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam && !isNaN(Number(idParam)) ? Number(idParam) : null;

    if (id === null) {
      this.handleError('ID del evento inválido.');
      return;
    }

    this.eventId = id;
    this.loadEventDetails();
  }

  private loadEventDetails(): void {
    if (this.eventId === null) {
      this.handleError('No se pudo obtener el ID del evento.');
      return;
    }

    this.eventService.apiEventEventodetallesEventoIdGet({ eventoId: this.eventId }).subscribe({
      next: (response) => {
        this.event = response as unknown as Evento;
        this.errorMessage = null;
        this.eventForm.patchValue(this.event); // Sincronizar el formulario con los datos cargados
      },
      error: (err) => {
        this.handleError('No se pudo cargar los detalles del evento.', err);
      },
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.handleError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    this.isSubmitting = true;

    if (this.eventId === null) {
      this.handleError('ID del evento no válido.');
      this.isSubmitting = false;
      return;
    }

    this.eventService.apiEventActualizareventoIdPut({
      id: this.eventId,
      body: this.eventForm.value,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.handleError('Error al actualizar el evento. Intenta nuevamente.', err);
        this.isSubmitting = false;
      },
    });
  }

  private handleError(message: string, err?: any): void {
    this.errorMessage = message;
    if (err) {
      console.error(message, err);
    }
  }
}



