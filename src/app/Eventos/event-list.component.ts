import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../api/api/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  eventos: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.apiEventEventosFiltradosGet().subscribe({
      next: (response) => (this.eventos = response),
      error: (err) => console.error('Error al cargar eventos:', err),
    });
  }
}
