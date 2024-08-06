import { TestBed } from '@angular/core/testing';

import { GrupoMuscularService } from './grupo-muscular.service';

describe('GrupoMuscularService', () => {
  let service: GrupoMuscularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoMuscularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
