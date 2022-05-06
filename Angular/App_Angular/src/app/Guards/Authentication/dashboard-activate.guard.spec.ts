import { TestBed } from '@angular/core/testing';

import { DashboardActivateGuard } from './dashboard-activate.guard';

describe('DashboardActivateGuard', () => {
  let guard: DashboardActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
