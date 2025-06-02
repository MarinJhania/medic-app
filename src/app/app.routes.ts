import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component'; // <--- Importa DoctorDashboardComponent

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctor/dashboard', component: DoctorDashboardComponent }, // <--- Agrega esta ruta
  // ... otras rutas
];