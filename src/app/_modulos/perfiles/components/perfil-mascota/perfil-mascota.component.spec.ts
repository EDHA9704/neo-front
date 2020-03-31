import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMascotaComponent } from './perfil-mascota.component';

describe('PerfilMascotaComponent', () => {
  let component: PerfilMascotaComponent;
  let fixture: ComponentFixture<PerfilMascotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilMascotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
