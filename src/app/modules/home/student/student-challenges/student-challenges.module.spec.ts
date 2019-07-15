import { StudentChallengesModule } from './student-challenges.module';

describe('StudentChallengesModule', () => {
  let studentChallengesModule: StudentChallengesModule;

  beforeEach(() => {
    studentChallengesModule = new StudentChallengesModule();
  });

  it('should create an instance', () => {
    expect(studentChallengesModule).toBeTruthy();
  });
});
