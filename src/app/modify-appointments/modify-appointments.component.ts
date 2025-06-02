import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify-appointments',
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent], // Elimina RouterLink de los imports
  templateUrl: './modify-appointments.component.html',
  styleUrls: ['./modify-appointments.component.css']
})
export class ModifyAppointmentsComponent implements OnInit {
  appointments: any[] = [
    { fecha: '2023-08-20', hora: '09:00', paciente: 'María López', motivo: 'Control mensual' },
    { fecha: '2023-08-21', hora: '10:30', paciente: 'Carlos Rodríguez', motivo: 'Primera consulta' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  nuevaCita(): void {
    console.log('Implementar lógica para crear una nueva cita');
  }

  editarCita(cita: any): void {
    console.log('Implementar lógica para editar la cita:', cita);
  }

  eliminarCita(cita: any): void {
    console.log('Implementar lógica para eliminar la cita:', cita);
  }
}