import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { GrupoMuscular } from 'src/core/models/GrupoMuscular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GrupoMuscularService {
  constructor(private http: HttpClient) {}

  findAll(filters?: GrupoMuscular | Partial<GrupoMuscular>) : Observable<GrupoMuscular[]>{
    const query =
      (filters &&
        Object.keys(filters).map(
          (k: string) => `${k}=${filters[k as keyof GrupoMuscular]}`
        )) ||
      '';
    return this.http
      .get<GrupoMuscular[]>(environment.apiUrl + '/grupo_muscular?' + query)
      .pipe(take(1));
  }
}
