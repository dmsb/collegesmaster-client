import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossGraphicsComponent } from './cross-graphics.component';

describe('CrossGraphicsComponent', () => {
  let component: CrossGraphicsComponent;
  let fixture: ComponentFixture<CrossGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
