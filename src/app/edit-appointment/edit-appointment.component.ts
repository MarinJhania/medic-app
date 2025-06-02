import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent, FormsModule], // Import FormsModule
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  appointmentId: string | null = null;
  appointment: any = { // Placeholder for appointment details
    fecha: '',
    hora: '',
    paciente: '',
    motivo: ''
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentId = params['id'];
      // In a real application, you would fetch the appointment details
      // using this.appointmentId from a service.
      console.log('Editing appointment ID:', this.appointmentId);
      this.loadAppointmentDetails(this.appointmentId);
    });
  }

  loadAppointmentDetails(id: string | null): void {
    // Simulate loading appointment details
    this.appointment = { fecha: '2023-08-20', hora: '09:00', paciente: 'María López', motivo: 'Control mensual' };
  }

  saveAppointment(): void {
    console.log('Saving appointment:', this.appointment);
    // Implement logic to save the updated appointment details
  }

  cancelEdit(): void {
    console.log('Cancelling edit');
    // Implement logic to navigate back to the appointments list
  }
}