import { TestBed } from '@angular/core/testing';

import { AuthenticationWorkerService } from './authentication-worker.service';

describe('AuthenticationWorkerService', () => {
  let service: AuthenticationWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
