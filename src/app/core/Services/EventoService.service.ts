import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import {EventService} from '../../api/services/event.service';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private eventservice: EventService
  ) {}

  apiEventFiltrarPost(filtro: any = {}): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/eventos/filtrar`, filtro);
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Usuario/listar`);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Usuario/actualizar/${id}`, usuario);
  }
}
