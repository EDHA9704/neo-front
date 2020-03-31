import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoluntariosComponent } from './avoluntarios.component';

describe('AvoluntariosComponent', () => {
  let component: AvoluntariosComponent;
  let fixture: ComponentFixture<AvoluntariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvoluntariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvoluntariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
