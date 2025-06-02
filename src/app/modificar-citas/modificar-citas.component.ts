import { Component, OnInit } from '@angular/core';
// Asegúrate de que esta ruta sea correcta desde modificar-citas.component.ts
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { CommonModule } from '@angular/common'; // Necesario para ngFor

// --- **Asegúrate de importar RouterLink aquí** ---
// (Si usas RouterLinkActive en la plantilla, impórtalo también)
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Importa Router, RouterLink, etc.

@Component({
  // El selector debe coincidir con cómo usas este componente
  selector: 'app-modificar-citas',
  standalone: true, // <-- Debe ser true
  imports: [
    CommonModule, // Necesario para ngFor
    SidebarMenuComponent, // Tu sidebar

    // --- **Asegúrate de que RouterLink (y RouterLinkActive) estén en este array** ---
    RouterLink,         // <--- AGREGADO
        // <--- AGREGADO (si lo usas en la plantilla)

    // Si tienes otros módulos o componentes standalone que uses directamente en el HTML, agrégalos aquí también
  ],
  templateUrl: './modificar-citas.component.html', // Asegúrate de que apunta al HTML correcto
  styleUrls: ['./modificar-citas.component.css'] // Asegúrate de que apunta al CSS correcto
})
export class ModificarCitasComponent implements OnInit { // El nombre de la clase según el error

  // Puedes tener tu array de citas y métodos aquí también
  appointments: any[] = [
    { fecha: '2023-08-20', hora: '09:00', paciente: 'María López', motivo: 'Control mensual' },
    { fecha: '2023-08-21', hora: '10:30', paciente: 'Carlos Rodríguez', motivo: 'Primera consulta' }
  ];

  // --- Inyecta Router si el botón "Nueva Cita" usa (click)="nuevaCita()" ---
  constructor(private router: Router) { } // Si no usas router.navigate, puedes quitar esto

  ngOnInit(): void {
  }

  // --- Método para el botón "Nueva Cita" si usa (click) ---
  nuevaCita(): void {
     this.router.navigate(['/doctor/appointments/edit', 'new']);
  }

  // --- Método para el link "Editar" si usa (click) ---
   editarCita(cita: any): void {
     // Lógica si el link de editar usa (click)="editarCita(cita)"
     // this.router.navigate(['/doctor/appointments/edit', cita.id]);
   }

  eliminarCita(cita: any): void {
    console.log('Implementar lógica para eliminar la cita:', cita);
  }
}