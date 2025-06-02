// patient-reminders.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor, [ngClass]
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component'; // Tu menú lateral
import { Router, RouterModule } from '@angular/router'; // Si necesitas navegar

@Component({
  selector: 'app-patient-reminders',
  standalone: true, // <--- Marca como standalone
  imports: [
    CommonModule, // Necesario para *ngFor, *ngIf, [ngClass]
    PatientSidebarMenuComponent,
    RouterModule // Si usas Router
    // Importa otros componentes o módulos que uses
  ],
  templateUrl: './patient-reminders.component.html',
  styleUrls: ['./patient-reminders.component.css']
})
export class PatientRemindersComponent implements OnInit {

  // Lista de recordatorios próximos
  upcomingReminders: any[] = [
    // Datos de ejemplo (en una app real, esto vendría de un servicio/API)
    {
      id: 1,
      doctor: 'Dr. García Martínez',
      date: '14 de noviembre de 2023',
      time: '09:00',
      method: 'correo', // 'correo' o 'SMS'
      status: 'Enviado' // 'Enviado' o 'Pendiente'
    },
    {
      id: 2,
      doctor: 'Dra. Rodríguez López',
      date: '19 de noviembre de 2023',
      time: '10:30',
      method: 'SMS', // 'correo' o 'SMS'
      status: 'Pendiente' // 'Enviado' o 'Pendiente'
    }
    // ... más recordatorios ...
  ];

  constructor(private router: Router) { } // Inyecta Router si necesitas navegar

  ngOnInit(): void {
    // Aquí cargarías los recordatorios reales del paciente desde un servicio
    // Ejemplo: this.reminderService.getUpcomingReminders(patientId).subscribe(data => this.upcomingReminders = data);
  }

  // Función para obtener la clase de icono según el método de recordatorio
  getReminderMethodIcon(method: string): string {
    switch (method.toLowerCase()) { // Convertir a minúsculas para comparar
      case 'correo':
        return 'fas fa-envelope'; // Icono de sobre
      case 'sms':
        return 'fas fa-mobile-alt'; // Icono de móvil
      default:
        return 'fas fa-question-circle'; // Icono por defecto si el método es desconocido
    }
  }

  // Si los ítems de recordatorio fueran clickeables, aquí manejarías el clic
  // handleClickReminder(reminder: any): void {
  //    console.log('Clic en recordatorio:', reminder);
  //    // Podrías navegar a los detalles de la cita asociada si tuvieran un relatedAppointmentId
  //    // this.router.navigate(['/patient/appointment-details', reminder.relatedAppointmentId]);
  // }

}