import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDonacionesComponent } from './mis-donaciones.component';

describe('MisDonacionesComponent', () => {
  let component: MisDonacionesComponent;
  let fixture: ComponentFixture<MisDonacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisDonacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
