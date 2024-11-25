import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionService } from '../Services/InscriptionService.service';

@Component({
  selector: 'app-inscription-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inscription-list.component.html',
})
export class InscriptionListComponent implements OnInit {
  inscriptions: any[] = [];
  errorMessage: string = '';

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit(): void {
    this.inscriptionService.obtenerUsuariosInscritos(1).subscribe({
      next: (response) => {
        this.inscriptions = response.resultado;
      },
      error: (err) => {
        console.error('Error al cargar inscripciones:', err);
        this.errorMessage = 'No se pudo cargar la lista de inscripciones.';
      },
    });
  }
}
