import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/Services/UserService.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.listarUsuarios().subscribe({
      next: (response) => {
        this.users = response.resultado;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.errorMessage = 'No se pudo cargar la lista de usuarios.';
      },
    });
  }
}
