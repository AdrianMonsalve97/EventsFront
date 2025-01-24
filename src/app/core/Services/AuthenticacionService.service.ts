import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticacionService {
  private apiUrl = environment.apiUrlToken;

  constructor(private http: HttpClient) {}

  login(CorreoCorporativo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/login`, { CorreoCorporativo, password }).pipe(
      tap((response: any) => {
        // Verificar que la respuesta tenga los datos correctos
        if (response && response.resultado && response.resultado.token) {
          // Almacenar el token JWT y la información del usuario en localStorage
          localStorage.setItem('authToken', response.resultado.token);
          localStorage.setItem('userId', response.resultado.usuarioId.toString());
          localStorage.setItem('userName', response.resultado.usuarioNombre);
        }
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(() => new Error('Error en la autenticación'));
      })
    );
  }

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/register`, usuario);
  }

  getUserId(): number {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : 0;
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
