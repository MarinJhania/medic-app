import { Component } from '@angular/core';
// 1. Importa el componente del menú lateral
// Asegúrate de que la ruta ('../patient-sidebar-menu/patient-sidebar-menu.component')
// sea correcta según dónde se encuentre tu componente del menú.
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component';

@Component({
  selector: 'app-patient-view',
  // Si estás usando 'imports' a nivel del @Component, es probable que
  // este componente deba ser 'standalone: true'
  standalone: true, // <-- Añade o asegúrate de que 'standalone: true' esté aquí
  imports: [
    // 2. Añade el componente del menú lateral al array 'imports'
    PatientSidebarMenuComponent
    // Si necesitas usar otros módulos o componentes (como CommonModule para ngIf/ngFor,
    // o ReactiveFormsModule), también deberían ir aquí si este componente es standalone.
  ],
  templateUrl: './patient-view.component.html',
  styleUrl: './patient-view.component.css'
})
export class PatientViewComponent {
  // Aquí va la lógica de tu componente
}