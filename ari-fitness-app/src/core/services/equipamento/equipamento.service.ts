import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Equipamento } from 'src/core/models/Equipamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  constructor(private http: HttpClient) {}

  find(filters?: Equipamento): Observable<Equipamento[]> {
    const query =
      (filters &&
        Object.keys(filters).map(
          (k: string) => `${k}=${filters[k as keyof Equipamento]}`
        )) ||
      '';
    return this.http
      .get<Equipamento[]>(environment.apiUrl + '/equipamentos?' + query)
      .pipe(take(1));
  }
}
