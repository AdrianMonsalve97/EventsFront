import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticacionService } from '../../core/Services/AuthenticacionService.service';

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
  passwordVisible = signal(false);
  passwordTouched = signal(false);

  canSubmit = computed(() => !this.isSubmitting() && this.loginForm()?.valid);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authenticacionService: AuthenticacionService,
    private readonly router: Router
  ) {
    this.loginForm.set(
      this.fb.group({
        correoCorporativo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
    );
  }

  onPasswordInput(event: any) {
    this.passwordTouched.set(event.target.value.length > 0); // Activa la animación cuando hay texto en la contraseña
  }

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());  // Cambia el estado de la visibilidad de la contraseña
  }

  onSubmit(): void {
    if (this.loginForm()?.valid) {
      const { correoCorporativo, password } = this.loginForm()?.value;
      this.isSubmitting.set(true);

      this.authenticacionService.login(correoCorporativo, password).subscribe({
        next: (response) => {
          if (!response.error) {
            localStorage.setItem('token', response.resultado);
            this.router.navigate(['/events']);
          } else {
            this.orMessage.set(response.mensaje);
          }
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error("Error en la solicitud de login:", err);
          this.orMessage.set("Error inesperado. Inténtalo de nuevo.");
          this.isSubmitting.set(false);
        },
      });
    } else {
    }
  }
}
