import { EventService } from './../api/api/event.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { EventoFiltroDto } from '../api/model/eventoFiltroDto';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private eventservice: EventService
  ) {}

  filtradoEventos(): Observable<any> {
    const body:EventoFiltroDto = {}
    return this.eventservice.apiEventFiltrarPost( body
    );
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Usuario/listar`);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Usuario/actualizar/${id}`, usuario);
  }
}
