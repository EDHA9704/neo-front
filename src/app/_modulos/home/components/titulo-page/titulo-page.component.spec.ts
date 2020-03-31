import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloPageComponent } from './titulo-page.component';

describe('TituloPageComponent', () => {
  let component: TituloPageComponent;
  let fixture: ComponentFixture<TituloPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TituloPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
