import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'; // <-- Importa Auth y signInWithEmailAndPassword
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // <-- Importa Firestore, doc, getDoc

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userType: string | null = null;
  email: string = '';
  password: string = '';
  errorMessage: string | null = null; // Para mostrar mensajes de error al usuario

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth, // <-- Inyecta el servicio Auth
    private firestore: Firestore // <-- Inyecta el servicio Firestore
  ) { }

  ngOnInit(): void {
    console.log('LoginComponent ngOnInit iniciado.');
    this.route.queryParams.subscribe(params => {
      this.userType = params['type'];
      console.log('NGONINIT - Objeto params:', params);
      console.log('NGONINIT - Tipo de usuario seleccionado:', this.userType);
    });
  }

  async onLoginSubmit(): Promise<void> { // Agregamos 'async' porque usaremos 'await'
    this.errorMessage = null; // Limpiar cualquier error previo
    console.log('ONLOGINSUBMIT - Intentando autenticar con correo:', this.email);

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, introduce tu correo y contraseña.';
      return;
    }

    try {
      // 1. Intentar iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      console.log('ONLOGINSUBMIT - Inicio de sesión exitoso. UID del usuario:', user.uid);

      // 2. Obtener el tipo de usuario (rol) desde Firestore
      // Asumimos que guardaste el rol del usuario en una colección 'users' con el UID como ID del documento
      if (user.uid) {
        const userDocRef = doc(this.firestore, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const role = userData['role']; // Asume que el campo del rol se llama 'role'

          console.log('ONLOGINSUBMIT - Rol del usuario desde Firestore:', role);

          // 3. Redirigir basado en el rol obtenido de Firestore
          if (role === 'doctor') {
            console.log('Redirigiendo a Doctor Dashboard...');
            this.router.navigate(['/doctor/dashboard']);
          } else if (role === 'patient') {
            console.log('Redirigiendo a Patient Dashboard...');
            this.router.navigate(['/patient/dashboard']);
          } else {
            // Si el rol existe pero no es 'doctor' ni 'patient'
            console.error('Error: Rol de usuario desconocido o inválido. No se puede redirigir.');
            this.errorMessage = 'Rol de usuario no reconocido. Contacta al administrador.';
            // Opcional: Cerrar sesión si el rol es inválido
            // await this.auth.signOut();
          }
        } else {
          // Si el documento del usuario no existe en Firestore
          console.error('Error: No se encontró el perfil de usuario en Firestore.');
          this.errorMessage = 'Perfil de usuario no encontrado. Contacta al administrador.';
          // Opcional: Cerrar sesión si no se encuentra el perfil
          // await this.auth.signOut();
        }
      } else {
        console.error('Error: UID de usuario no disponible después del inicio de sesión.');
        this.errorMessage = 'Error en el inicio de sesión. Inténtalo de nuevo.';
      }

    } catch (error: any) { // Capturar errores de Firebase Authentication
      console.error('ONLOGINSUBMIT - Error durante el inicio de sesión:', error.message);
      switch (error.code) {
        case 'auth/user-not-found':
          this.errorMessage = 'Correo electrónico no registrado.';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'Formato de correo electrónico inválido.';
          break;
        case 'auth/network-request-failed':
          this.errorMessage = 'Problema de conexión a la red. Inténtalo de nuevo.';
          break;
        case 'auth/too-many-requests':
          this.errorMessage = 'Demasiados intentos fallidos. Inténtalo de nuevo más tarde.';
          break;
        default:
          this.errorMessage = 'Error en el inicio de sesión. Por favor, verifica tus credenciales.';
          break;
      }
    }
  }

  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }
}