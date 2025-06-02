// patient-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para ngIf, ngFor
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component'; // Tu menú lateral
import { Router, RouterModule } from '@angular/router'; // Si necesitas navegar después de guardar
import { FormsModule } from '@angular/forms'; // <--- Importa FormsModule para [(ngModel)]

@Component({
  selector: 'app-patient-profile',
  standalone: true, // <--- Marca como standalone
  imports: [
    CommonModule,
    PatientSidebarMenuComponent,
    RouterModule, // Si usas Router o directivas de router
    FormsModule // <-- Necesario para el two-way binding en los inputs
    // Importa otros componentes o módulos que uses
  ],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  // Propiedad para almacenar los datos del usuario
  userData: any = {
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    insuranceNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  };

  constructor(private router: Router) { } // Inyecta Router si necesitas navegar

  ngOnInit(): void {
    // Aquí cargarías los datos del usuario actual desde un servicio
    // Ejemplo: this.userService.getUserProfile().subscribe(data => this.userData = data);
    // Por ahora, puedes inicializar con datos de ejemplo si quieres ver el layout con datos
    this.userData = {
       fullName: 'María González López',
       email: 'maria.gonzalez@example.com',
       phone: '555-123-4567',
       birthDate: '1985-06-15', // Formato 'YYYY-MM-DD' para input type="date"
       address: 'Calle Principal 123, Ciudad de México',
       insuranceNumber: 'SEG-987654321',
       emergencyContactName: 'Juan González',
       emergencyContactPhone: '555-987-6543'
    };
  }

  // Método para manejar el clic en el botón "Guardar cambios"
  saveChanges(): void {
    console.log('Guardando cambios del usuario:', this.userData);

    // **Implementa la lógica de guardado aquí:**
    // 1. Validar los datos del formulario si es necesario
    // 2. Llama a un servicio para enviar los datos actualizados al backend
    // Ejemplo: this.userService.updateUserProfile(this.userData).subscribe({
    //   next: () => {
            console.log('Perfil actualizado exitosamente');
            // 3. Opcional: Muestra un mensaje de éxito al usuario
            // 4. Opcional: Navega a otra página (ej: dashboard)
            // this.router.navigate(['/patient/dashboard']);
    //   },
    //   error: (err) => {
            // Maneja errores, ej: muestra un mensaje de error al usuario
    //       console.error('Error al actualizar el perfil', err);
    //    }
    // });
  }

  // Si añades un botón Cancelar, podrías tener un método similar
  onCancel(): void {
      console.log('Cancelar edición de perfil');
      // Navegar de regreso sin guardar
      // this.router.navigate(['/patient/dashboard']);
  }

}