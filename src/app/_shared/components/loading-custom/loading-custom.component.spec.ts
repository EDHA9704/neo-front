import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCustomComponent } from './loading-custom.component';

describe('LoadingCustomComponent', () => {
  let component: LoadingCustomComponent;
  let fixture: ComponentFixture<LoadingCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
