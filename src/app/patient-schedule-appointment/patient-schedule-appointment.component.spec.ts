import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScheduleAppointmentComponent } from './patient-schedule-appointment.component';

describe('PatientScheduleAppointmentComponent', () => {
  let component: PatientScheduleAppointmentComponent;
  let fixture: ComponentFixture<PatientScheduleAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientScheduleAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientScheduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
