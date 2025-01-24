import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar pipes como "date"
import { EventService } from '../../api/services/event.service';
import {MenuComponent} from '../../Shared/Menu/menu/menu.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, MenuComponent], // Agrega CommonModule aquí
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {
  event: any = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEventDetails(eventId);
  }

  loadEventDetails(eventId: number): void {
    this.eventService.apiEventEventodetallesEventoIdGet({ eventoId: eventId }).subscribe({
      next: (response) => {
        this.event = response;
      },
      error: (err) => {
        console.error('Error al obtener los detalles del evento:', err);
        this.errorMessage = 'No se pudo cargar el evento. Intenta nuevamente.';
      },
    });
  }
  goBack(): void {
    window.history.back();
  }

}
