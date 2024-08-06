/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MusculoService } from './musculo.service';

describe('Service: Musculo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusculoService]
    });
  });

  it('should ...', inject([MusculoService], (service: MusculoService) => {
    expect(service).toBeTruthy();
  }));
});
