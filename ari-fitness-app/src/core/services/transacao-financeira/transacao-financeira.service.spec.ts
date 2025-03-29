import { TestBed } from '@angular/core/testing';

import { TransacaoFinanceiraService } from './transacao-financeira.service';

describe('TransacaoFinanceiraService', () => {
  let service: TransacaoFinanceiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransacaoFinanceiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
