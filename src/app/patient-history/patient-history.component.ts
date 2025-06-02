import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Patient {
  id: number; // O el tipo de tu identificador de paciente
  nombre: string;
  ultimaVisita: string;
  proximaVisita: string;
}

@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent, RouterLink],
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  patients: Patient[] = []; // <--- ¡Declara e inicializa la propiedad 'patients' aquí!

  constructor() { }

  ngOnInit(): void {
    // Aquí deberías llamar a un servicio para obtener la lista de pacientes
    this.loadPatients();
  }

  loadPatients(): void {
    // Simulación de la obtención de la lista de pacientes (reemplazar con llamada a servicio)
    this.patients = [
      { id: 1, nombre: 'María López', ultimaVisita: '15/05/2023', proximaVisita: '15/06/2023' },
      { id: 2, nombre: 'Carlos Rodríguez', ultimaVisita: '10/05/2023', proximaVisita: '10/06/2023' },
      { id: 3, nombre: 'Ana Martínez', ultimaVisita: '05/05/2023', proximaVisita: '05/06/2023' },
      { id: 4, nombre: 'Juan Pérez', ultimaVisita: '01/05/2023', proximaVisita: '01/06/2023' }
    ];
  }
}