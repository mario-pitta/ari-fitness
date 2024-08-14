import { TestBed } from '@angular/core/testing';

import { OverlayControllerService } from './overlay-controller.service';

describe('OverlayControllerService', () => {
  let service: OverlayControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
