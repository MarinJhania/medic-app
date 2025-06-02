// patient-notifications.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientSidebarMenuComponent } from '../patient-sidebar-menu/patient-sidebar-menu.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Si lo tenías importado

@Component({
  selector: 'app-patient-notifications',
  standalone: true,
  imports: [
    CommonModule,
    PatientSidebarMenuComponent,
    RouterModule,
    FormsModule // Si lo tenías importado
  ],
  templateUrl: './patient-notifications.component.html',
  styleUrls: ['./patient-notifications.component.css']
})
export class PatientNotificationsComponent implements OnInit {

  notifications: any[] = [
    // ... tus datos de ejemplo ...
     {
       id: 1, type: 'appointment', title: 'Cita Confirmada',
       message: 'Su cita con Dr. García Martínez ha sido confirmada para mañana a las 09:00.',
       date: '14 de noviembre, 10:30', isRead: false
     },
     {
       id: 2, type: 'message', title: 'Mensaje del Doctor',
       message: 'Por favor traiga sus últimos análisis de sangre a la consulta.',
       date: '13 de noviembre, 15:20', isRead: true
     },
     {
       id: 3, type: 'system', title: 'Actualización del Sistema',
       message: 'Hemos actualizado nuestros términos de servicio.',
       date: '12 de noviembre, 09:00', isRead: false
     }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Cargar datos reales aquí
  }

  // >>> Añade este getter <<<
  get unreadCount(): number {
    // Esta lógica se ejecuta en el TS, donde es más seguro manejar undefined/null
    // Usamos ?. para notificaciones y ?? 0 para asegurar que el resultado es un número
    return this.notifications?.filter(n => !n.isRead).length ?? 0;
  }

  // ... el resto de tus métodos (getNotificationIcon, handleClickNotification, etc.) ...
   getNotificationIcon(type: string): string {
     switch (type) {
       case 'appointment': return 'fas fa-calendar-alt';
       case 'message': return 'fas fa-comment-dots';
       case 'system': return 'fas fa-info-circle';
       default: return 'fas fa-bell';
     }
   }

   handleClickNotification(notification: any): void {
       console.log('Clic en notificación:', notification);
       if (!notification.isRead) {
           notification.isRead = true;
           // Lógica para marcar como leída en backend
       }
       // Lógica opcional para navegar
   }

}