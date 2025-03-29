import { join } from 'path';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransacaoFinanceira } from 'src/core/models/TransacaoFInanceira';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransacaoFinanceiraDashService {
  constructor(private http: HttpClient) {}

  getByPeriod(
    data_inicio: string,
    data_fim: string,
    empresa_id: string,
    filters?: Partial<TransacaoFinanceira>
  ) {
    let params = { ...filters, data_inicio, data_fim, empresa_id };
    const query = Object.keys(params)
      .map((k) => k + '=' + params[k as keyof typeof params])
      .join('&');
    console.log('query: ', query);
    return this.http.get<TransacaoFinanceira[]>(
      `${environment.apiUrl}/transacao-financeira-dash?${query}`
    );
  }
}
