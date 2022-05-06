import { TestBed } from '@angular/core/testing';

import { CanLoadSaleModuleGuard } from './can-load-sale-module.guard';

describe('CanLoadSaleModuleGuard', () => {
  let guard: CanLoadSaleModuleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadSaleModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
