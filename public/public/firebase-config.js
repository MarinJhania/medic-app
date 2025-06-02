// Importa las funciones que necesitas del SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Ya lo tienes, para Analytics
import { getFirestore } from "firebase/firestore"; // <-- ¡IMPORTANTE: Añade esta línea!
import { getAuth } from "firebase/auth";       // <-- ¡IMPORTANTE: Añade esta línea!

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// La configuración de tu aplicación web de Firebase
// Para Firebase JS SDK v7.20.0 y posterior, measurementId es opcional
const firebaseConfig = {
  apiKey: "AIzaSyBQLiXJQhwATXVsG2oBkqSTWuyJSYcGE2U",
  authDomain: "mi-clinica-app-12345.firebaseapp.com",
  projectId: "mi-clinica-app-12345",
  storageBucket: "mi-clinica-app-12345.firebasestorage.app",
  messagingSenderId: "303697127784",
  appId: "1:303697127784:web:1cd0574fe4a816acc74edd",
  measurementId: "G-TJZN4EDD0Y"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// <-- ¡IMPORTANTE: Añade estas líneas para Firestore y Auth!
const db = getFirestore(app); // Obtiene la instancia de Firestore
const auth = getAuth(app);   // Obtiene la instancia de Authentication

// <-- ¡IMPORTANTE: Añade esta exportación para usarlos en otros archivos!
export { app, analytics, db, auth };// Exporta la instancia de la app también si la necesitas