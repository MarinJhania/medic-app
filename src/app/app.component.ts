import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component'; // Ajusta la ruta
import { RegisterComponent } from './register/register.component'; // <--- Importa RegisterComponent
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component'; // <--- Importa DoctorDashboardComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RegisterComponent, DoctorDashboardComponent], // <--- Agrega DoctorDashboardComponent a los imports
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}