// In main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { DoctorDashboardComponent } from './app/doctor-dashboard/doctor-dashboard.component';
import { PatientHistoryComponent } from './app/patient-history/patient-history.component';
import { PatientDetailComponent } from './app/patient-detail/patient-detail.component';
import { ModifyAppointmentsComponent } from './app/modify-appointments/modify-appointments.component';
import { EditAppointmentComponent } from './app/edit-appointment/edit-appointment.component';
import { ModificarCitasComponent }  from './app/modificar-citas/modificar-citas.component';
import { EnviarRecordatoriosComponent } from './app/enviar-recordatorios/enviar-recordatorios.component';
// --- Importa los componentes de paciente ---
import { PatientDashboardComponent } from './app/patient-dashboard/patient-dashboard.component';
import { PatientViewComponent } from './app/patient-view/patient-view.component';
import { PatientScheduleAppointmentComponent } from './app/patient-schedule-appointment/patient-schedule-appointment.component';
import { PatientCancelAppointmentComponent } from './app/patient-cancel-appointment/patient-cancel-appointment.component';
import { PatientProfileComponent } from './app/patient-profile/patient-profile.component';
import { PatientAppointmentHistoryComponent } from './app/patient-appointment-history/patient-appointment-history.component';
import { PatientNotificationsComponent } from './app/patient-notifications/patient-notifications.component';
import { PatientRemindersComponent } from './app/patient-reminders/patient-reminders.component';

// Importa Firebase y tu configuración
// import { initializeApp } from 'firebase/app'; // <--- Elimina esta importación si no la usas directamente
// import { getAnalytics } from 'firebase/analytics'; // <--- Elimina esta importación si no la usas directamente
import { firebaseConfig } from './environments/firebase-config'; // <--- Mantén esta importación de tu configuración
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app'; // <--- Mantén esta
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { provideAnalytics, getAnalytics } from '@angular/fire/analytics'; // Si quieres usar Analytics con AngularFire

// ELIMINA ESTAS LÍNEAS DE INICIALIZACIÓN DIRECTA
// const appFirebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(appFirebase);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'doctor/dashboard', component: DoctorDashboardComponent },
      { path: 'doctor/patients', component: PatientHistoryComponent },
      { path: 'doctor/patient/:id', component: PatientDetailComponent },
      { path: 'doctor/appointments', component: ModifyAppointmentsComponent },
      { path: 'doctor/appointments/edit/:id', component: EditAppointmentComponent },
      { path: 'doctor/citas/editar', component: ModificarCitasComponent },
      { path: 'doctor/enviar-recordatorios', component: EnviarRecordatoriosComponent },

      { path: 'patient/dashboard', component: PatientDashboardComponent },
      { path: 'patient/view', component: PatientViewComponent },
      { path: 'patient/agendar', component: PatientScheduleAppointmentComponent },
      { path: 'patient/cancelar', component: PatientCancelAppointmentComponent },
      { path: 'patient/datos', component: PatientProfileComponent },
      { path: 'patient/historial', component: PatientAppointmentHistoryComponent },
      { path: 'patient/notificaciones', component: PatientNotificationsComponent },
      { path: 'patient/recordatorios', component: PatientRemindersComponent },
    ], withComponentInputBinding()),
    // Solo usa provideFirebaseApp aquí, y pasa tu firebaseConfig importada
    provideFirebaseApp(() => initializeApp_alias(firebaseConfig)), // <--- Usa firebaseConfig importada
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // Si quieres Analytics con AngularFire:
    // provideAnalytics(() => getAnalytics())
  ],
}).catch(err => console.error(err));