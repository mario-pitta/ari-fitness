import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, Observable } from 'rxjs';
import { Plano } from 'src/core/models/Empresa';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlanoService {
  constructor(private http: HttpClient) {}

  findAll() : Observable<Plano[]>{
    return this.http.get<Plano[]>(environment.apiUrl + '/planos').pipe(take(1));
  }
  findByFilters(filters: Partial<Plano> | Plano): Observable<Plano[]>  {
    const query = Object.keys(filters).map((k: string) => `${k}=${filters[k as keyof Plano]}`).join('&');;
    return this.http.get<Plano[]>(environment.apiUrl + '/planos?'+query).pipe(take(1));
  }
}
