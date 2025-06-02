// patient-appointment-history.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component'; // Tu menú lateral
import { Router, RouterModule } from '@angular/router'; // Si necesitas navegar
import { FormsModule } from '@angular/forms'; // <--- Necesario para [(ngModel)] en los filtros

@Component({
  selector: 'app-patient-appointment-history',
  standalone: true, // <--- Marca como standalone
  imports: [
    CommonModule, // Necesario para *ngFor y *ngIf
    PatientSidebarMenuComponent,
    RouterModule, // Si usas Router
    FormsModule // <-- Necesario para el two-way binding en los inputs/selects de filtro
    // Importa otros componentes o módulos que uses
  ],
  templateUrl: './patient-appointment-history.component.html',
  styleUrls: ['./patient-appointment-history.component.css']
})
export class PatientAppointmentHistoryComponent implements OnInit {

  // Lista completa de citas
  appointments: any[] = [
    // Datos de ejemplo (en una app real, esto vendría de un servicio/API)
     { id: 1, doctor: 'Dr. García Martínez', specialty: 'Medicina General', type: 'Consulta de rutina', date: '2023-11-14', time: '09:00', status: 'Programada' },
     { id: 2, doctor: 'Dra. Rodríguez López', specialty: 'Cardiología', type: 'Revisión anual', date: '2023-11-19', time: '10:30', status: 'Programada' },
     { id: 3, doctor: 'Dr. Fernández Ruiz', specialty: 'Dermatología', type: 'Revisión de lunar', date: '2023-10-04', time: '16:00', status: 'Completada' },
     { id: 4, doctor: 'Dra. Sánchez Vega', specialty: 'Oftalmología', type: 'Revisión de vista', date: '2023-09-21', time: '11:15', status: 'Cancelada' },
     // Agrega más citas de ejemplo si quieres probar los filtros
     { id: 5, doctor: 'Dr. García Martínez', specialty: 'Medicina General', type: 'Seguimiento', date: '2024-01-20', time: '14:00', status: 'Programada' },
     { id: 6, doctor: 'Dra. Rodríguez López', specialty: 'Cardiología', type: 'Primera consulta', date: '2023-08-10', time: '11:00', status: 'Completada' },

  ];

  // Lista de citas mostradas después de aplicar filtros
  filteredAppointments: any[] = [];

  // Variables para los filtros (enlazar con [(ngModel)] en el HTML)
  statusFilter: string = 'Todas';
  dateFrom: string = ''; // Usar formato YYYY-MM-DD para coincidir con input type="date"
  dateTo: string = '';

  // Contador de resultados
  resultsCount: number = 0;

  constructor(private router: Router) { } // Inyecta Router si necesitas navegar

  ngOnInit(): void {
    // Cargar datos reales aquí:
    // Ejemplo: this.appointmentService.getPatientHistory(patientId).subscribe(data => {
    //   this.appointments = data;
    //   this.applyFilters(); // Aplicar filtros iniciales
    // });

    // Por ahora, usamos los datos de ejemplo y aplicamos filtros al inicio
    this.applyFilters();
  }

  // Método para aplicar los filtros
  applyFilters(): void {
    console.log('Aplicando filtros:', this.statusFilter, this.dateFrom, this.dateTo);

    let tempAppointments = [...this.appointments]; // Copia la lista completa

    // 1. Filtrar por estado
    if (this.statusFilter !== 'Todas') {
      tempAppointments = tempAppointments.filter(cita => cita.status === this.statusFilter);
    }

    // 2. Filtrar por rango de fechas
    if (this.dateFrom) {
        // Asegurarse de que la fecha de la cita también esté en formato comparable (YYYY-MM-DD)
        tempAppointments = tempAppointments.filter(cita => new Date(cita.date) >= new Date(this.dateFrom));
    }
     if (this.dateTo) {
         // Asegurarse de que la fecha de la cita también esté en formato comparable (YYYY-MM-DD)
         tempAppointments = tempAppointments.filter(cita => new Date(cita.date) <= new Date(this.dateTo));
     }

    // 3. Actualizar la lista filtrada y el contador
    this.filteredAppointments = tempAppointments;
    this.resultsCount = this.filteredAppointments.length;
  }

  // Este método se llamaría al hacer clic en "Descargar PDF"
  downloadPdf(): void {
    console.log('Generando PDF de historial de citas...');
    // Aquí implementarías la lógica para generar o descargar el PDF
    // Esto podría implicar llamar a un servicio backend o usar una librería JS para generar PDFs desde el HTML.
    alert('Funcionalidad de descargar PDF no implementada en este ejemplo.'); // Placeholder
  }

  // Puedes añadir métodos para manejar el cambio en cada filtro
  // Por ejemplo, llamar a applyFilters() cada vez que cambia un filtro
  onFilterChange(): void {
      this.applyFilters();
  }

}