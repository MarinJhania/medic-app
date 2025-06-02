import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAppointmentsComponent } from './modify-appointments.component';

describe('ModifyAppointmentsComponent', () => {
  let component: ModifyAppointmentsComponent;
  let fixture: ComponentFixture<ModifyAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
