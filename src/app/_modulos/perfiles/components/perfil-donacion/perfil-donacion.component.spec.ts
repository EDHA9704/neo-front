import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDonacionComponent } from './perfil-donacion.component';

describe('PerfilDonacionComponent', () => {
  let component: PerfilDonacionComponent;
  let fixture: ComponentFixture<PerfilDonacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDonacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
