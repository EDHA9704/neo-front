import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEmergenciaComponent } from './perfil-emergencia.component';

describe('PerfilEmergenciaComponent', () => {
  let component: PerfilEmergenciaComponent;
  let fixture: ComponentFixture<PerfilEmergenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilEmergenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
