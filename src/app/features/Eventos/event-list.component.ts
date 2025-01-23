import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../api/api/event.service';
import { CommonModule } from '@angular/common';
import { Evento } from '../api/client';
import { EventoFiltroDto } from '../api/model/models';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  filtroForm: FormGroup = new FormBuilder().group({
    nombre: [''],
    ubicacion: [''],
    fechaHora: [''],
    capacidadMaxima: [null],
  });
  eventos: Evento[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.cargarEventos(); // Cargar todos los eventos inicialmente
  }

  cargarEventos(filtro: EventoFiltroDto= {}): void {
    this.eventService.apiEventFiltrarPost(filtro).subscribe({
      next: (response) => {
        if (!response.error) {
          this.eventos = response.resultado;
        } else {
          console.error('Error en la respuesta:', response.mensaje);
        }
      },
      error: (err) => console.error('Error al cargar eventos:', err),
    });
  }

  aplicarFiltro(): void {
    const filtro = this.filtroForm.value;
    // Convierte fecha a formato ISO si es necesario
    filtro.fechaHora = filtro.fechaHora ? new Date(filtro.fechaHora).toISOString() : null;
    this.cargarEventos(filtro);
  }
}
