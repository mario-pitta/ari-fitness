/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PagetitleService } from './pagetitle.service';

describe('Service: Pagetitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagetitleService]
    });
  });

  it('should ...', inject([PagetitleService], (service: PagetitleService) => {
    expect(service).toBeTruthy();
  }));
});
