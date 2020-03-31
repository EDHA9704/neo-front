import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMascotasComponent } from './mis-mascotas.component';

describe('MisMascotasComponent', () => {
  let component: MisMascotasComponent;
  let fixture: ComponentFixture<MisMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
