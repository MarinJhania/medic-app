import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { RouterLink } from '@angular/router';

interface Consulta {
  fecha: string;
  tipo: string;
  notas: string;
  prescripcion: string;
}

interface PacienteDetalle {
  nombre: string;
  edad: number;
  historialConsultas: Consulta[];
}

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent, RouterLink],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patientId: string | null = null;
  patient: PacienteDetalle | null = null; // <--- ¡Declara la propiedad 'patient' aquí!

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      // En una aplicación real, aquí harías una llamada a un servicio
      // para obtener los detalles del paciente usando this.patientId
      console.log('ID del paciente:', this.patientId);
      this.loadPatientDetails(this.patientId);
    });
  }

  loadPatientDetails(id: string | null): void {
    // Simulación de datos del paciente (reemplazar con llamada a servicio)
    this.patient = {
      nombre: 'María López',
      edad: 35,
      historialConsultas: [
        { fecha: '15/05/2023', tipo: 'Consulta', notas: 'Control mensual rutinario', prescripcion: 'Paracetamol 500mg' },
        { fecha: '15/04/2023', tipo: 'Consulta', notas: 'Dolor de cabeza frecuente', prescripcion: 'Ibuprofeno 400mg' }
      ]
    };
  }

  agendarNuevaCita(): void {
    console.log('Agendar nueva cita para:', this.patient?.nombre);
    // Lógica para agendar cita
  }

  enviarRecordatorio(): void {
    console.log('Enviar recordatorio a:', this.patient?.nombre);
    // Lógica para enviar recordatorio
  }
}