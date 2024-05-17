import { TestBed } from '@angular/core/testing';

import { BatchTableService } from './batch-table.service';

describe('BatchTableService', () => {
  let service: BatchTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
