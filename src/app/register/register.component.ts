import { Component, OnInit } from '@angular/core'; // Añade OnInit aquí
import { RouterModule, Router, ActivatedRoute } from '@angular/router'; // Asegura que ActivatedRoute también esté importado
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importante para ngIf y ngClass

// Importa los servicios de Firebase de AngularFire
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule, // Para routerLink
    FormsModule,  // Para el enlace de datos bidireccional [(ngModel)]
    CommonModule, // Importante para ngIf y ngClass
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { // Implementa OnInit
  // Campos del formulario
  fullName!: string;
  email!: string;
  phone!: string;
  birthDate!: string;
  password!: string;
  confirmPassword!: string;
  acceptTerms: boolean = false;

  // Propiedad para almacenar el tipo de usuario (doctor/patient) de la URL
  userType: string | null = null;

  // Mensajes para la retroalimentación del usuario
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  /**
   * Inyecta los servicios Router, Auth (Autenticación de Firebase), Firestore (Base de datos de Firebase)
   * y ActivatedRoute (para leer parámetros de la URL).
   * @param router El servicio Router de Angular para la navegación.
   * @param auth El servicio Auth de AngularFire.
   * @param firestore El servicio Firestore de AngularFire.
   * @param route El servicio ActivatedRoute para acceder a los parámetros de consulta de la URL.
   */
  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {}

  /**
   * Se ejecuta al inicializar el componente. Lee el parámetro 'type' de la URL.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userType = params['type'];
      console.log('RegisterComponent ngOnInit - Tipo de usuario para registro (desde URL):', this.userType);
      if (!this.userType || (this.userType !== 'doctor' && this.userType !== 'patient')) {
        console.warn('Advertencia: El tipo de usuario en la URL de registro no es válido o no está especificado. Se recomienda usar ?type=doctor o ?type=patient.');
        // Puedes establecer un valor por defecto o mostrar un mensaje al usuario
        // this.userType = 'patient'; // Ejemplo: por defecto a paciente
      }
    });
  }

  /**
   * Maneja el envío del formulario de registro.
   * Realiza la validación del lado del cliente e interactúa con Firebase para la creación de usuarios y el almacenamiento de datos.
   */
  async onRegisterSubmit(): Promise<void> {
    this.resetMessages(); // Limpia los mensajes anteriores

    // Validaciones del lado del cliente
    if (this.password !== this.confirmPassword) {
      this.showMessage('Las contraseñas no coinciden.', 'error');
      return;
    }

    if (this.password.length < 6) {
      this.showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }

    if (!this.acceptTerms) {
      this.showMessage('Debes aceptar la política de privacidad y el tratamiento de datos personales.', 'error');
      return;
    }

    // Validación adicional: Asegurarse de que tenemos un tipo de usuario válido para guardar
    if (!this.userType || (this.userType !== 'doctor' && this.userType !== 'patient')) {
      this.showMessage('Error: El tipo de usuario para el registro no está definido o es inválido. Por favor, asegúrate de acceder a esta página con un tipo de usuario válido (ej. /register?type=patient).', 'error');
      return;
    }

    try {
      // 1. Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;
      console.log("Usuario registrado en Authentication:", user.uid);

      // 2. Guardar información adicional del usuario en Firestore, incluyendo el rol
      if (user && user.uid) {
        await setDoc(doc(this.firestore, "users", user.uid), {
          fullName: this.fullName,
          email: this.email,
          phone: this.phone,
          birthDate: this.birthDate,
          createdAt: new Date(), // Marca de tiempo de la creación del usuario
          role: this.userType // <-- ¡AQUÍ ES DONDE SE GUARDA EL ROL EN FIRESTORE!
        });

        this.showMessage('¡Registro exitoso! Redirigiendo a iniciar sesión...', 'success');

        // Redirigir a la página de inicio de sesión después de un breve retraso
        setTimeout(() => {
          // Opcional: pasar el tipo de usuario al login si tu login lo usa para pre-seleccionar algo
          this.router.navigate(['/login'], { queryParams: { type: this.userType } });
        }, 2000);
      } else {
        this.showMessage('Error: No se pudo obtener el UID del usuario después del registro.', 'error');
      }

    } catch (error: any) {
      console.error("Error durante el registro:", error);
      let errorMessage = 'Error al registrar la cuenta.';

      // Proporcionar mensajes de error amigables basados en los códigos de error de Firebase
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El correo electrónico ya está registrado.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico es inválido.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'El registro con email/contraseña no está habilitado. Contacta al administrador.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil.';
          break;
        default:
          errorMessage += ` (${error.message})`; // Fallback para errores no manejados
      }
      this.showMessage(errorMessage, 'error');
    }
  }

  /**
   * Muestra un mensaje al usuario.
   * @param msg El mensaje a mostrar.
   * @param type El tipo de mensaje ('success' o 'error') para el estilo.
   */
  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
  }

  /**
   * Restablece el mensaje y el tipo de mensaje.
   */
  resetMessages(): void {
    this.message = '';
    this.messageType = '';
  }

  /**
   * Alterna la visibilidad de un campo de entrada de contraseña.
   * @param inputElement El elemento HTML input para la contraseña.
   * @param buttonElement El elemento HTML button que activa el cambio.
   */
  togglePasswordVisibility(inputElement: HTMLInputElement, buttonElement: HTMLButtonElement): void {
    const type = inputElement.type === 'password' ? 'text' : 'password';
    inputElement.type = type;
    // Actualiza el texto/icono del botón según la visibilidad
    buttonElement.textContent = (type === 'password') ? '👁️' : '🔒';
  }
}
