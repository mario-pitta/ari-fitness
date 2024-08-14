import { TestBed } from '@angular/core/testing';

import { FichaAlunoService } from './ficha-aluno.service';

describe('FichaAlunoService', () => {
  let service: FichaAlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaAlunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
