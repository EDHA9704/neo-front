import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomeComponent } from './home-header.component';

describe('HeaderComponent', () => {
  let component: HeaderHomeComponent;
  let fixture: ComponentFixture<HeaderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderHomeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
