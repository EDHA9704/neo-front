import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AciudadanosComponent } from './aciudadanos.component';

describe('AciudadanosComponent', () => {
  let component: AciudadanosComponent;
  let fixture: ComponentFixture<AciudadanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AciudadanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AciudadanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
