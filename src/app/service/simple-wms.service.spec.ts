import { TestBed, inject } from '@angular/core/testing';

import { SimpleWMSService } from './simple-wms.service';

describe('SimpleWmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleWMSService]
    });
  });

  it('should be created', inject([SimpleWMSService], (service: SimpleWMSService) => {
    expect(service).toBeTruthy();
  }));
});
