import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFundacionComponent } from './footer-fundacion.component';

describe('FooterFundacionComponent', () => {
  let component: FooterFundacionComponent;
  let fixture: ComponentFixture<FooterFundacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterFundacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterFundacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
