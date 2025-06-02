import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRemindersComponent } from './patient-reminders.component';

describe('PatientRemindersComponent', () => {
  let component: PatientRemindersComponent;
  let fixture: ComponentFixture<PatientRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRemindersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
