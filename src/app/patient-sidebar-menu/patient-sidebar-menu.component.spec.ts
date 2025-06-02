import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSidebarMenuComponent } from './patient-sidebar-menu.component';

describe('PatientSidebarMenuComponent', () => {
  let component: PatientSidebarMenuComponent;
  let fixture: ComponentFixture<PatientSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
