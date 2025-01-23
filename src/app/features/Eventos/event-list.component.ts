import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../api/services/event.service';
import { EventoFiltroDto } from '../../api/models/evento-filtro-dto';
import { Evento } from '../../api/models/evento';
import { ApiEventFiltrarPost$Params } from '../../api/fn/event/api-event-filtrar-post';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuComponent } from "../../Shared/Menu/menu/menu.component";

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

  constructor() {
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
    console.log('Cargando eventos con filtro:', params.body);
    this.eventService.apiEventFiltrarPost(params).subscribe(
      {
        next: (eventos) => {
          this.eventos = eventos;
        },
        error: (err) => {}
      }
    )
  }

  // Método para aplicar el filtro desde el formulario
  aplicarFiltro(): void {
    const filtro = this.filtroForm.value as EventoFiltroDto;
    this.cargarEventos(filtro);
  }
}
