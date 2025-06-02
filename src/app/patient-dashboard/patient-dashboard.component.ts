import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf, ngFor, etc.
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component'; // Tu componente de menú del paciente
import { RouterLink } from '@angular/router'; // Necesario para [routerLink] en las tarjetas si las haces navegables

@Component({
  selector: 'app-patient-dashboard', // Selector para usar este componente
  standalone: true, // <--- Marca como standalone
  imports: [
    CommonModule, // Si aplicas ngIf, ngFor en la plantilla
    PatientSidebarMenuComponent, // Importa el menú del paciente
    RouterLink // <--- Importa RouterLink si usas [routerLink] en las tarjetas o links de la cita
    // Importa otros componentes o módulos standalone si los usas
  ],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  // Aquí podrías tener variables para los datos dinámicos, ej:
  patientName: string = 'Juan';
  nextAppointment: any = {
    fecha: '15 de Junio, 2023',
    hora: '10:00 AM',
    doctor: 'Dr. García',
    especialidad: 'Medicina General'
  };

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías cargar los datos reales del paciente y su próxima cita
  }

  // Métodos para las acciones de la próxima cita (si usas botones con (click))
  reagendarCita(): void {
    console.log('Implementar lógica para reagendar cita');
    // Aquí podrías navegar a la página de reagendar pasando el ID de la cita
    // this.router.navigate(['/patient/reagendar-cita', this.nextAppointment.id]);
  }

  cancelarCita(): void {
     console.log('Implementar lógica para cancelar cita');
     // Aquí podrías mostrar un modal de confirmación y luego llamar a un servicio para cancelar
  }
}