import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChallengeComponent } from './delete-challenge.component';

describe('DeleteChallengeComponent', () => {
  let component: DeleteChallengeComponent;
  let fixture: ComponentFixture<DeleteChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
