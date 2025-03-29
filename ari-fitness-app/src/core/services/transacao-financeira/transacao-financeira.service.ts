import { TransacaoFinanceira } from './../../models/TransacaoFInanceira';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransacaoFinanceiraDashService } from '../dashboard/transacao-financeira-dash/transacao-financeira-dash.service';

@Injectable({
  providedIn: 'root'
})
export class TransacaoFinanceiraService {
  constructor(private http: HttpClient, private transacaoFinanceiraDashService: TransacaoFinanceiraDashService) { }


  getDashboard(data_inicio: string, data_fim: string, empresa_id: string) {
    console.log(' data_inicio, data_fim, empresa_id : ',  data_inicio, data_fim, empresa_id );

    return this.transacaoFinanceiraDashService.getByPeriod( data_inicio, data_fim, empresa_id );
  }
  getTrasacoes(filters: Partial<TransacaoFinanceira> | any) {

    const query = Object.keys(filters)
      .map((k: string) => `${k}=${filters[k as keyof TransacaoFinanceira]}`)
      .join('&');

    return this.http
      .get<any>(`${environment.apiUrl}/transacao-financeira?${query}`)
      .pipe(take(1));

  }
  save(transacao: any) {

    const req = transacao.id
      ? this.http.put<any>(`${environment.apiUrl}/transacao-financeira/`, transacao)
      : this.http.post<any>(`${environment.apiUrl}/transacao-financeira`, transacao);

    return req
  }


  getTiposTransacaoFinanceira() {
    return this.http.get<any>(`${environment.apiUrl}/transacao-financeira/tipos?fl_ativo=1`);
  }


  getCategoriasByTipoId(tipoId: number) {
    const query = `fl_ativo=1&tr_tipo_id=${tipoId}`;
    return this.http.get<any>(`${environment.apiUrl}/transacao-financeira/categorias?${query}`);
  }

}
