import { TestBed } from '@angular/core/testing';

import { AnswerBookService } from './answer-book.service';

describe('ChallengeResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnswerBookService = TestBed.get(AnswerBookService);
    expect(service).toBeTruthy();
  });
});
