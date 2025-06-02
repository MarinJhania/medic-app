// patient-cancel-appointment.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component'; // Tu menú lateral
import { Router, RouterModule } from '@angular/router'; // Si necesitas navegar después de cancelar

@Component({
  selector: 'app-patient-cancel-appointment',
  standalone: true, // <--- Marca como standalone
  imports: [
    CommonModule, // Necesario para *ngFor si iteras sobre la lista de citas
    PatientSidebarMenuComponent,
    RouterModule // Si usas Router o directivas de router
    // Importa otros componentes o módulos que uses
  ],
  templateUrl: './patient-cancel-appointment.component.html',
  styleUrls: ['./patient-cancel-appointment.component.css']
})
export class PatientCancelAppointmentComponent implements OnInit {

  // Propiedad para almacenar la lista de citas activas
  activeAppointments: any[] = [
    // Datos de ejemplo (en una app real, esto vendría de un servicio/API)
    {
      id: 1,
      doctor: 'Dr. García Martínez',
      specialty: 'Medicina General',
      type: 'Consulta de rutina',
      date: '14/11/2023',
      time: '09:00',
      status: 'Programada'
    },
    {
      id: 2,
      doctor: 'Dra. Rodríguez López',
      specialty: 'Cardiología',
      type: 'Revisión anual',
      date: '19/11/2023',
      time: '10:30',
      status: 'Programada'
    }
    // ... más citas ...
  ];

  constructor(private router: Router) { } // Inyecta Router si necesitas navegar

  ngOnInit(): void {
    // Aquí cargarías las citas activas reales del paciente desde un servicio
    // Ejemplo: this.appointmentService.getActiveAppointments(patientId).subscribe(data => this.activeAppointments = data);
  }

  // Método para manejar el clic en el botón Cancelar
  cancelAppointment(appointmentId: number): void {
    console.log('Intentando cancelar cita con ID:', appointmentId);

    // **Implementa la lógica de cancelación aquí:**
    // 1. Confirmación al usuario (opcional pero recomendado, ej: usando un SweetAlert o un modal)
    const confirmCancel = confirm('¿Estás seguro de que deseas cancelar esta cita?');

    if (confirmCancel) {
      // 2. Llama a un servicio para enviar la solicitud de cancelación al backend
      // Ejemplo: this.appointmentService.cancelAppointment(appointmentId).subscribe({
      //   next: () => {
            console.log('Cita cancelada exitosamente');
            // 3. Opcional: Actualiza la lista de citas en la interfaz quitando la cita cancelada
            this.activeAppointments = this.activeAppointments.filter(cita => cita.id !== appointmentId);
            // 4. Opcional: Muestra un mensaje de éxito al usuario
      //   },
      //   error: (err) => {
            // Maneja errores, ej: muestra un mensaje de error al usuario
      //      console.error('Error al cancelar la cita', err);
      //   }
      // });
    }
     // No se navega automáticamente después de cancelar; el usuario permanece en la lista para cancelar otras citas
  }

}