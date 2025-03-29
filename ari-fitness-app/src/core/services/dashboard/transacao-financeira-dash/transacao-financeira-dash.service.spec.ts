import { TestBed } from '@angular/core/testing';

import { TransacaoFinanceiraDashService } from './transacao-financeira-dash.service';

describe('TransacaoFinanceiraDashService', () => {
  let service: TransacaoFinanceiraDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransacaoFinanceiraDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
