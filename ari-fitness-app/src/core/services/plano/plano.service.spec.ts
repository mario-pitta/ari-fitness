/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanoService } from './plano.service';

describe('Service: Plano', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanoService]
    });
  });

  it('should ...', inject([PlanoService], (service: PlanoService) => {
    expect(service).toBeTruthy();
  }));
});
