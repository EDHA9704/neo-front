import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCustomComponent } from './map-custom.component';

describe('MapCustomComponent', () => {
  let component: MapCustomComponent;
  let fixture: ComponentFixture<MapCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
