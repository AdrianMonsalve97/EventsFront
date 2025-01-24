import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('authToken'); // Usar 'authToken' en lugar de 'token'

    // Clonar la solicitud para agregar el token en los headers
    const clonedRequest = request.clone({
      setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);

        // Si el error es de tipo 401 (no autorizado)
        if (error.status === 401) {
          // Eliminar el token almacenado y redirigir al login
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          this.router.navigate(['/login']);
        }

        return throwError(() => new Error(error.message || 'Error desconocido'));
      })
    );
  }
}
