import { TestBed } from '@angular/core/testing';

import { DashboardWorkerService } from './dashboard-worker.service';

describe('DashboardWorkerService', () => {
  let service: DashboardWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
