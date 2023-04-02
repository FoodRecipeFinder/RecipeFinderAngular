import { TestBed } from '@angular/core/testing';

import { RecipePageGuard } from './recipe-page.guard';

describe('RecipePageGuard', () => {
  let guard: RecipePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipePageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
