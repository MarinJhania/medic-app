// patient-schedule-appointment.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component'; // Tu menú lateral
import { Router, RouterModule } from '@angular/router'; // Para navegación
import { FormsModule } from '@angular/forms'; // Para [(ngModel)] si lo usas

@Component({
  selector: 'app-patient-schedule-appointment',
  standalone: true, // <--- Marca como standalone
  imports: [
    CommonModule,
    PatientSidebarMenuComponent,
    RouterModule, // Si usas Router o directivas como routerLink (aunque los botones de acción final suelen usar (click))
    FormsModule // Si usas two-way binding en inputs o selects
    // Importa otros componentes o módulos que uses (ej: si creas un componente para un calendario)
  ],
  templateUrl: './patient-schedule-appointment.component.html',
  styleUrls: ['./patient-schedule-appointment.component.css']
})
export class PatientScheduleAppointmentComponent implements OnInit {

  // Propiedades para manejar las selecciones
  selectedSpecialty: string | null = null;
  selectedDoctor: any | null = null; // Podría ser un objeto doctor
  selectedDate: string = '';
  selectedTime: string = '';

  // Datos de ejemplo (en una app real vendrían de un servicio)
  specialties: string[] = ['Medicina General', 'Cardiología', 'Dermatología', 'Pediatría'];
  doctors: any[] = [ // Ejemplo simple
      { id: 1, name: 'Dr. García Martínez', specialty: 'Medicina General' },
      { id: 2, name: 'Dra. Rodríguez López', specialty: 'Medicina General' },
      { id: 3, name: 'Dr. Pérez Gómez', specialty: 'Cardiología' }
      // ... más doctores ...
  ];
  availableDoctors: any[] = []; // Doctores filtrados por especialidad
  availableTimeSlots: string[] = []; // Horarios disponibles para doctor y fecha

  constructor(private router: Router) { } // Inyecta Router si necesitas navegar

  ngOnInit(): void {
    // Lógica de inicialización si la necesitas
  }

  // Métodos para manejar la selección
  selectSpecialty(specialty: string): void {
    this.selectedSpecialty = specialty;
    this.selectedDoctor = null; // Reinicia selección de doctor
    this.selectedDate = '';     // Reinicia selección de fecha/hora
    this.selectedTime = '';
    console.log('Especialidad seleccionada:', specialty);
    // Filtrar doctores basados en la especialidad seleccionada
    this.availableDoctors = this.doctors.filter(doc => doc.specialty === specialty);
    // Aquí podrías añadir lógica visual para activar/desactivar especialidades en el HTML
  }

  selectDoctor(doctor: any): void {
    this.selectedDoctor = doctor;
    this.selectedDate = ''; // Reinicia fecha/hora al cambiar de doctor
    this.selectedTime = '';
    console.log('Doctor seleccionado:', doctor.name);
    // Aquí podrías cargar calendarios o fechas disponibles para este doctor
     // Por ahora, limpiamos horarios
     this.availableTimeSlots = [];
  }

  // Este método se llamaría cuando el input de fecha cambia
  onDateChange(event: any): void {
      this.selectedDate = event.target.value;
      this.selectedTime = ''; // Reinicia hora al cambiar de fecha
      console.log('Fecha seleccionada:', this.selectedDate);
      // Aquí llamarías a un servicio para obtener los horarios disponibles
      // para this.selectedDoctor.id y this.selectedDate
      // Por ahora, simulamos algunos horarios si hay doctor y fecha
      if (this.selectedDoctor && this.selectedDate) {
          this.availableTimeSlots = ['09:00', '09:30', '10:00', '10:30']; // Horarios de ejemplo
      } else {
          this.availableTimeSlots = [];
      }
  }

  selectTimeSlot(time: string): void {
    this.selectedTime = time;
    console.log('Horario seleccionado:', time);
    // Lógica para aplicar estilo 'selected' en el HTML
  }


  // Métodos para los botones de acción final
  onCancel(): void {
    console.log('Cancelar proceso de agendar cita');
    // Navegar a la vista principal del paciente
     this.router.navigate(['/patient/dashboard']); // O donde quieras dirigir al cancelar
  }

  onConfirmAppointment(): void {
    if (this.selectedSpecialty && this.selectedDoctor && this.selectedDate && this.selectedTime) {
      console.log('Confirmar nueva cita:');
      console.log('Especialidad:', this.selectedSpecialty);
      console.log('Doctor:', this.selectedDoctor.name);
      console.log('Fecha:', this.selectedDate);
      console.log('Horario:', this.selectedTime);

      // Aquí enviarías esta información a tu backend para crear la cita
      // Por ejemplo: this.appointmentService.createAppointment({ ...datos de la cita ... }).subscribe(...);

      // Después de crear la cita exitosamente, navegar a una página de confirmación o al historial de citas
       // this.router.navigate(['/patient/appointment-confirmed']);
       // O al historial:
       this.router.navigate(['/patient/historial-citas']); // Ejemplo
    } else {
      console.log('Por favor, completa todos los pasos (Especialidad, Doctor, Fecha y Horario).');
      // Muestra un mensaje de error al usuario
    }
  }

}