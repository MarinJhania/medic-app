import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // RouterOutlet removed if not used

@Component({
  selector: 'app-patient-sidebar-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './patient-sidebar-menu.component.html',
  styleUrls: ['./patient-sidebar-menu.component.css']
})
export class PatientSidebarMenuComponent implements OnInit {

  isSidebarHidden: boolean = false; // Controls if the sidebar is completely off-screen (desktop/tablet)
  isSidebarCollapsed: boolean = false; // Controls if the sidebar is in its collapsed state (desktop/tablet)
  isSidebarVisibleMobile: boolean = false; // Controls if the sidebar is explicitly shown as an overlay on mobile

  isMobileView: boolean = false; // Flag to determine if we are in a mobile view.

  constructor() { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  /**
   * Determines the initial or default state of the sidebar
   * based on the current screen width.
   * This runs on init and resize.
   */
  checkScreenSize() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      // Mobile view (less than 768px): Sidebar is hidden by default.
      this.isMobileView = true;
      this.isSidebarHidden = true; // Hidden off-screen
      this.isSidebarCollapsed = false; // Not applicable
      this.isSidebarVisibleMobile = false; // Not visible initially
    } else if (screenWidth >= 768 && screenWidth <= 1024) {
      // Tablet/Small Desktop: Collapsed by default.
      this.isMobileView = false;
      this.isSidebarCollapsed = true; // Collapsed
      this.isSidebarHidden = false; // Not hidden
      this.isSidebarVisibleMobile = false; // Not a mobile overlay
    } else {
      // Large Desktops (>= 1025px): Expanded by default.
      this.isMobileView = false;
      this.isSidebarCollapsed = false; // Expanded
      this.isSidebarHidden = false; // Not hidden
      this.isSidebarVisibleMobile = false; // Not a mobile overlay
    }
  }

  /**
   * Toggles the sidebar state (hidden, collapsed, expanded)
   * depending on the current screen size and user interaction.
   */
  toggleSidebar() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      // Mobile behavior: Toggles between visible and hidden (overlay)
      this.isSidebarVisibleMobile = !this.isSidebarVisibleMobile;
      // When mobile sidebar is visible, it's not "hidden" in the sense of translateX(-100%)
      // When it's not visible, it IS hidden.
      this.isSidebarHidden = !this.isSidebarVisibleMobile;
      this.isSidebarCollapsed = false; // Ensure it's not collapsed on mobile
    } else if (screenWidth >= 768 && screenWidth <= 1024) {
      // Tablet/Small Desktop behavior: Toggles between collapsed and hidden
      if (this.isSidebarCollapsed) {
        // If it's collapsed, clicking hides it completely
        this.isSidebarHidden = true;
        this.isSidebarCollapsed = false;
      } else { // If it's hidden or any other state, clicking restores it to collapsed
        this.isSidebarCollapsed = true;
        this.isSidebarHidden = false;
      }
      this.isSidebarVisibleMobile = false; // Not applicable in this range
    } else {
      // Large Desktops behavior: Toggles between expanded and collapsed
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.isSidebarHidden = false; // Ensure it's not completely hidden when toggling between expanded/collapsed
      this.isSidebarVisibleMobile = false; // Not applicable in this range
    }
  }

  /**
   * Closes the sidebar when a link is clicked on mobile.
   * This is called by (click)="closeSidebarOnMobile()" on each RouterLink.
   */
  closeSidebarOnMobile() {
    if (this.isMobileView) { // Only apply this logic if in mobile view
      this.isSidebarVisibleMobile = false; // Hide the mobile overlay
      this.isSidebarHidden = true; // Set to hidden off-screen
    }
  }
}