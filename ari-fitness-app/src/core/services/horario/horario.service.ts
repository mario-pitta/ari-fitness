import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Horario } from 'src/core/models/Horario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

constructor(private http: HttpClient) { }


findAll() : Observable<Horario[]> {
  return  this.http.get<Horario[]>(environment.apiUrl + '/horarios').pipe(take(1))
}
findByFilters(filters: Partial<Horario> | Horario) : Observable<Horario[]> {
  const query = Object.keys(filters).map((k: string) => `${k}=${filters[k as keyof Horario]}`);
  console.log("query")
  return  this.http.get<Horario[]>(environment.apiUrl + '/horarios?'+query).pipe(take(1));
}
}
