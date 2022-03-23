import { TestBed } from '@angular/core/testing';

import { DomainAPIService } from './domain-api.service';

describe('DomainAPIService', () => {
  let service: DomainAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
