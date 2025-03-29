import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  getAnaliseFinanceira(data: {
    empresa_id: string;
    data_inicio: string;
    data_fim: string;
  }) {
    return this.http.get(
      `${environment.apiUrl}/ai/gemini/relatorio-financas/${data.empresa_id}?data_inicio=${data.data_inicio}&data_fim=${data.data_fim}`
    );
  }

  constructor(private http: HttpClient) {}
}
