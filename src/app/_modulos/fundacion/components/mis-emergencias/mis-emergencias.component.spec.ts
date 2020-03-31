import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisEmergenciasComponent } from './mis-emergencias.component';

describe('MisEmergenciasComponent', () => {
  let component: MisEmergenciasComponent;
  let fixture: ComponentFixture<MisEmergenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisEmergenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisEmergenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
