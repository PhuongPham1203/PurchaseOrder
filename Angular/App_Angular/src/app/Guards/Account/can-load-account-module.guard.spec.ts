import { TestBed } from '@angular/core/testing';

import { CanLoadAccountModuleGuard } from './can-load-account-module.guard';

describe('CanLoadAccountModuleGuard', () => {
  let guard: CanLoadAccountModuleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadAccountModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
