import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticacionService } from '../core/Services/AuthenticacionService.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {


  loginForm = signal<any>(null);
  isSubmitting = signal(false);
  orMessage = signal("");


  canSubmit = computed(() => !this.isSubmitting() && this.loginForm()?.valid);

  constructor(private fb: FormBuilder, private authenticacionService: AuthenticacionService, private router: Router) {
    this.loginForm.set(
      this.fb.group({
        correo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
    );
  }

  onSubmit(): void {
    if (this.loginForm()?.valid) {
      const { correo, password } = this.loginForm()?.value;
      this.isSubmitting.set(true);
      this.authenticacionService.login(correo, password).subscribe({
        next: (response) => {

          // Verifica si el servidor indicó que el login fue exitoso
          if (!response.error) {
            localStorage.setItem('token', response.resultado); // Guarda el token
            this.router.navigate(['/events']); // Redirige a la ruta de eventos
          } else {
            this.orMessage.set(response.mensaje); // Muestra el mensaje de error del servidor
          }
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('Error en la solicitud de login:', err);
          this.orMessage.set('Error inesperado. Inténtalo de nuevo.');
          this.isSubmitting.set(false);
        },
      });
    }
  }

  }


