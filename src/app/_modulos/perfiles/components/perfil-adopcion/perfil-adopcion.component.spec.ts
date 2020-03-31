import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdopcionComponent } from './perfil-adopcion.component';

describe('PerfilAdopcionComponent', () => {
  let component: PerfilAdopcionComponent;
  let fixture: ComponentFixture<PerfilAdopcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAdopcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
