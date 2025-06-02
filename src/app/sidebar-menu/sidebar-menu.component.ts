import { Component, OnInit, HostListener } from '@angular/core'; // Importa HostListener y OnInit
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule para ngClass si lo usas

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  isSidebarHidden: boolean = false;
  isSidebarCollapsed: boolean = false;
  isSidebarVisibleMobile: boolean = false;
  isMobileView: boolean = false; // Add this property

  ngOnInit(): void {
    this.checkMobileView(); // Check initial view on component load
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkMobileView(); // Update view on window resize
  }

  checkMobileView(): void {
    // Define your mobile breakpoint, e.g., 768px for common mobile devices
    this.isMobileView = window.innerWidth <= 768;

    // If not in mobile view, ensure the mobile sidebar is not visible
    if (!this.isMobileView) {
      this.isSidebarVisibleMobile = false;
    }
  }

  toggleSidebar(): void {
    if (this.isMobileView) {
      this.isSidebarVisibleMobile = !this.isSidebarVisibleMobile;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.isSidebarHidden = false; // Ensure it's not hidden when toggling collapse
    }
  }

  // Add the missing method
  closeSidebarOnMobile(): void {
    if (this.isMobileView) {
      this.isSidebarVisibleMobile = false;
    }
  }
}