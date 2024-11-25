import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../api/api/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-edit.component.html',
})
export class EventEditComponent implements OnInit {
  eventForm!: FormGroup; 
  eventId!: number; 
  event: any = null; 
  errorMessage: string = ''; 
  isSubmitting: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id')); // Obtener ID del evento desde la URL
    this.loadEventDetails(); // Cargar detalles del evento

    // Inicializar el formulario
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidadMaxima: [1, [Validators.required, Validators.min(1)]],
    });
  }

  loadEventDetails(): void {
    this.eventService.apiEventEventodetallesEventoIdGet(this.eventId).subscribe({
      next: (response) => {
        this.event = response;
        this.eventForm.patchValue(this.event); // Llenar el formulario con los valores actuales del evento
      },
      error: (err) => {
        console.error('Error al cargar los detalles del evento:', err);
        this.errorMessage = 'No se pudo cargar el evento.';
      },
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.isSubmitting = true;
      this.eventService
        .apiEventActualizareventoIdPut(this.eventId, this.eventForm.value)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            console.log('Evento actualizado con éxito.');
            this.router.navigate(['/events']); // Redirigir a la lista de eventos
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error al actualizar el evento:', err);
            this.errorMessage = 'Error al actualizar el evento.';
          },
        });
    }
  }
}
