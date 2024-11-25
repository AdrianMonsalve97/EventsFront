import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticacionService {
  private apiUrl = environment.apiUrlToken;

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/4uth/Auth/login`, { correo, password });
  }

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/4uth/Auth/register`, usuario);
  }
}
