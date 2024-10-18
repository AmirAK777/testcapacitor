import { TestBed } from '@angular/core/testing';

import { SmsValidationService } from './sms-validation.service';

describe('SmsValidationService', () => {
  let service: SmsValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
