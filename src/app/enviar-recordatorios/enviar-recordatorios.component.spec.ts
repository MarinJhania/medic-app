import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarRecordatoriosComponent } from './enviar-recordatorios.component';

describe('EnviarRecordatoriosComponent', () => {
  let component: EnviarRecordatoriosComponent;
  let fixture: ComponentFixture<EnviarRecordatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarRecordatoriosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarRecordatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
