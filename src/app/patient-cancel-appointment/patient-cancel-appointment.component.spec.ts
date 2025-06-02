import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCancelAppointmentComponent } from './patient-cancel-appointment.component';

describe('PatientCancelAppointmentComponent', () => {
  let component: PatientCancelAppointmentComponent;
  let fixture: ComponentFixture<PatientCancelAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientCancelAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCancelAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
