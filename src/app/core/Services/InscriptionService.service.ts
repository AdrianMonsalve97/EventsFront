import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registrarInscripcion(eventoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Inscripcion/registrar`, { EventoId: eventoId });
  }

  obtenerUsuariosInscritos(eventoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Inscripcion/usuariosinscritos/${eventoId}`);
  }

  obtenerEventosFiltrados(): Observable<any> {
    return this.http.get('https://localhost:666/api/Event/eventos-filtrados');
  }
}
