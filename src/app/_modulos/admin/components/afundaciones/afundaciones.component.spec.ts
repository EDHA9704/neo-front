import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AFundacionesComponent } from './afundaciones.component';

describe('AFundacionesComponent', () => {
  let component: AFundacionesComponent;
  let fixture: ComponentFixture<AFundacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AFundacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AFundacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
