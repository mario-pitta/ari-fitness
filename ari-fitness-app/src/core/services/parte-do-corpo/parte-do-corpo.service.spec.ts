/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParteDoCorpoService } from './parte-do-corpo.service';

describe('Service: ParteDoCorpo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParteDoCorpoService]
    });
  });

  it('should ...', inject([ParteDoCorpoService], (service: ParteDoCorpoService) => {
    expect(service).toBeTruthy();
  }));
});
