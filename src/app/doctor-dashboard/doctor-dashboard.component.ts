import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component'; // Importa el componente de menú
import { CommonModule } from '@angular/common'; // Importa CommonModule si aún no está

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true, // Marca el componente como independiente
  imports: [CommonModule, SidebarMenuComponent], // Importa el componente de menú aquí
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}