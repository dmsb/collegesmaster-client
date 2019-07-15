import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChallengesComponent } from './student-challenges.component';

describe('StudentChallengesComponent', () => {
  let component: StudentChallengesComponent;
  let fixture: ComponentFixture<StudentChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
