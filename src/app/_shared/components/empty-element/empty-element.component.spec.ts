import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyElementComponent } from './empty-element.component';

describe('EmptyElementComponent', () => {
  let component: EmptyElementComponent;
  let fixture: ComponentFixture<EmptyElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
