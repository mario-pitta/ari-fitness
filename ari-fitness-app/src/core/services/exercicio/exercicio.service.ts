import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Exercicio } from 'src/core/models/Exercicio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercicioService {
  save(exercicio: Exercicio) {
    if (!exercicio.id) delete exercicio.id;
    return this.http[exercicio.id ? 'put' : 'post'](
      environment.apiUrl + '/exercicios',
      exercicio
    ).pipe(take(1));
  }

  constructor(private http: HttpClient) {}

  find(filters?: Exercicio | Partial<Exercicio>): Observable<Exercicio[]> {
    const query =
      (filters &&
        Object.keys(filters).map(
          (k: string) => `${k}=${filters[k as keyof Exercicio]}`
        )) ||
      '';
    return this.http
      .get<Exercicio[]>(environment.apiUrl + '/exercicios?' + query)
      .pipe(take(1));
  }
}
