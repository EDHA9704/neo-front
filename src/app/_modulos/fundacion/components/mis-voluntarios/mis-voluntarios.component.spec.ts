import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisVoluntariosComponent } from './mis-voluntarios.component';

describe('MisVoluntariosComponent', () => {
  let component: MisVoluntariosComponent;
  let fixture: ComponentFixture<MisVoluntariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisVoluntariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisVoluntariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
