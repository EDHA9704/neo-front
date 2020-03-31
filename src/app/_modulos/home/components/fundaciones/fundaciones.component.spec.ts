import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundacionesComponent } from './fundaciones.component';

describe('FundacionesComponent', () => {
  let component: FundacionesComponent;
  let fixture: ComponentFixture<FundacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
