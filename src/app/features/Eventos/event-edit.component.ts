import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../api/services/event.service';
import { MenuComponent } from "../../Shared/Menu/menu/menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  templateUrl: './event-edit.component.html',
  imports: [MenuComponent, ReactiveFormsModule,CommonModule],
})
export class EditarEventoComponent implements OnInit {
  eventForm!: FormGroup;
  errorMessage: string | null = null;
  isSubmitting = false;
  eventId: number = 12;  // Supongo que tienes el ID del evento (puede venir de la ruta o de otro lugar)

  constructor(
    private fb: FormBuilder,
    private eventService: EventService // Servicio para obtener datos del evento
  ) {}

  ngOnInit() {
    // Inicializar el formulario
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidadMaxima: ['', [Validators.required, Validators.min(1), Validators.max(40)]]
    });

    // Obtener los datos del evento desde el servidor
    this.eventService.apiEventEventodetallesEventoIdGet({ eventoId: this.eventId }).subscribe(
      (response: any) => {
        console.log(response);  // Asegúrate de que esta línea imprima los datos correctos
        if (response) {
          this.eventForm.patchValue({
            nombre: response.nombre,
            descripcion: response.descripcion,
            fechaHora: response.fechaHora,
            ubicacion: response.ubicacion,
            capacidadMaxima: response.capacidadMaxima
          });
        }
      },
      (error: any) => {
        this.errorMessage = 'Hubo un error al cargar los datos del evento';
      }
    );
    
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.isSubmitting = true;
      // Aquí iría la lógica para enviar los datos modificados al servidor
      this.eventService.apiEventActualizareventoIdPut(this.eventForm.value).subscribe(
        (response:any) => {
          this.isSubmitting = false;
        },
        (error: any) => {
          this.isSubmitting = false;
          this.errorMessage = 'Hubo un error al guardar los cambios';
        }
      );
    } else {
      this.errorMessage = 'Por favor complete todos los campos requeridos.';
    }
  }
}



