import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Categoria } from 'src/core/models/Equipamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  http = inject(HttpClient);

  save(categoria:  Categoria | Partial<Categoria>) {

    return this.http[categoria.id ? 'put' : 'post'](environment.apiUrl + '/categoria', categoria).pipe(take(1))


  }

  find(filters?: Categoria | Partial<Categoria>): Observable<Categoria[]> {
    const query =
    (filters &&
      Object.keys(filters).map(
        (k: string) => `${k}=${filters[k as keyof Categoria]}`
      )) ||
    '';
      return this.http.get<Categoria[]>(environment.apiUrl + '/categoria?' + query).pipe(take(1))
  }

  constructor() {}
}
