import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngFor y ngClass
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component'; // Tu componente de sidebar
import { Router } from '@angular/router'; // Necesario si quieres navegar desde aquí, aunque en esta interfaz no parece ser el caso directo.

@Component({
  selector: 'app-enviar-recordatorios',
  standalone: true, // <-- Marca como standalone
  imports: [
    CommonModule, // <-- Importa CommonModule para ngFor y ngClass
    SidebarMenuComponent
    // Importa aquí cualquier otra directiva o componente standalone que uses en el HTML
    // Por ejemplo, si el sidebar usa RouterLink/RouterLinkActive y no está exportado por SidebarMenuComponent
    // o si este componente usaría RouterLink en su plantilla principal (poco probable aquí)
    // RouterLink,
    // RouterLinkActive
  ],
  templateUrl: './enviar-recordatorios.component.html',
  styleUrls: ['./enviar-recordatorios.component.css']
})
export class EnviarRecordatoriosComponent implements OnInit {

  // Datos de ejemplo para los recordatorios
  reminders: any[] = [
    { id: 1, paciente: 'María López', fecha: '2023-08-20', hora: '09:00', estado: 'Pendiente' },
    { id: 2, paciente: 'Carlos Rodríguez', fecha: '2023-08-21', hora: '10:30', estado: 'Enviado' },
    // Agrega más datos aquí
    { id: 3, paciente: 'Ana Gómez', fecha: '2023-08-22', hora: '11:00', estado: 'Pendiente' },
  ];

  // Inyecta servicios necesarios (Router si vas a navegar, o servicios para enviar recordatorios)
  constructor(private router: Router /*, private reminderService: any */) { } // Descomenta si necesitas el Router o un servicio

  ngOnInit(): void {
    // Aquí podrías cargar los recordatorios reales, por ejemplo:
    // this.reminderService.getReminders().subscribe(data => this.reminders = data);
  }

  enviarTodosRecordatorios(): void {
    console.log('Implementar lógica para enviar TODOS los recordatorios Pendientes');
    // Lógica para enviar recordatorios pendientes (ej. llamar a un servicio)
    // Después de enviar, podrías actualizar el estado en el array
    // this.reminders.forEach(r => { if (r.estado === 'Pendiente') r.estado = 'Enviado'; });
  }

  enviarRecordatorio(reminder: any): void {
    console.log('Implementar lógica para enviar recordatorio a:', reminder.paciente);
    console.log('Recordatorio:', reminder);
    // Lógica para enviar un recordatorio específico (ej. llamar a un servicio)
    // Después de enviar, actualiza el estado de este recordatorio en el array
    if (reminder.estado === 'Pendiente') {
       reminder.estado = 'Enviado';
       console.log('Estado actualizado a Enviado');
       // Nota: La actualización directa del objeto en el array funciona gracias a que Angular detecta el cambio
    }
  }

  // Si necesitas navegar a otra página al hacer clic en la fila o algún otro elemento:
  // verDetalleRecordatorio(reminder: any): void {
  //   this.router.navigate(['/ruta-detalle-recordatorio', reminder.id]);
  // }
}