import { TestBed } from '@angular/core/testing';

import { LamaServiceService } from './lama-service.service';

describe('LamaServiceService', () => {
  let service: LamaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LamaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
