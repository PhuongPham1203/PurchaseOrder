import { TestBed } from '@angular/core/testing';

import { AccountInfoGuard } from './account-info.guard';

describe('AccountInfoGuard', () => {
  let guard: AccountInfoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountInfoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
