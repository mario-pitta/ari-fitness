import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Treino } from 'src/core/models/Treino';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreinoService {
  constructor(private http: HttpClient) {}

  find(filters?: Treino): Observable<Treino[]> {
    const query =
      (filters &&
        Object.keys(filters).map(
          (k: string) => `${k}=${filters[k as keyof Treino]}`
        )) ||
      '';
    return this.http
      .get<Treino[]>(environment.apiUrl + '/treinos?' + query)
      .pipe(take(1));
  }

  create(body: Treino) {
    return this.http.post(environment.apiUrl + '/treinos', body).pipe(take(1));
  }
  update(body: Treino | Partial<Treino>) {
    return this.http.put(environment.apiUrl + '/treinos', body).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl+ '/treinos/'+ id).pipe(take(1))
  }
}
