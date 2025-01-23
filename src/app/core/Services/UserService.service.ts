import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Usuario/listar`);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Usuario/actualizar/${id}`, usuario);
  }
}
