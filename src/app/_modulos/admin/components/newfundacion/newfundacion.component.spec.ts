import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfundacionComponent } from './newfundacion.component';

describe('NewfundacionComponent', () => {
  let component: NewfundacionComponent;
  let fixture: ComponentFixture<NewfundacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfundacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfundacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
