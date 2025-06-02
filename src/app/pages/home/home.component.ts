import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <--- Importa RouterLink

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <header class="home-header">
        <h1>MEDIC</h1>
        <p>Sistema de Gestión Médica</p>
      </header>
      <main class="home-options">
        <div class="option-card patient-card">
          <div class="icon patient-icon"></div>
          <h2 class="card-title">Paciente</h2>
          <p class="card-description">Módulo de consultas y servicios para pacientes</p>
          <a [routerLink]="['/login']" [queryParams]="{ type: 'patient' }" class="access-link patient-link">
            Acceder como paciente →
          </a>
        </div>

        <div class="option-card doctor-card">
          <div class="icon doctor-icon"></div>
          <h2 class="card-title">Doctor</h2>
          <p class="card-description">Módulo de consultas y actividades del doctor</p>
          <a [routerLink]="['/login']" [queryParams]="{ type: 'doctor' }" class="access-link doctor-link">
            Acceder como doctor →
          </a>
        </div>
      </main>
      <footer class="home-footer">
        <p>Seleccione el tipo de acceso para continuar</p>
      </footer>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
