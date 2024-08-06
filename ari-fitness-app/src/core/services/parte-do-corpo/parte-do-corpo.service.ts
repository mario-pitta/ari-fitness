import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ParteDoCorpo } from 'src/core/models/ParteDoCorpo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParteDoCorpoService {
  constructor(private http: HttpClient) {}

  findAll(filters?: ParteDoCorpo | Partial<ParteDoCorpo>) : Observable<ParteDoCorpo[]>{
    const query =
      (filters &&
        Object.keys(filters).map(
          (k: string) => `${k}=${filters[k as keyof ParteDoCorpo]}`
        )) ||
      '';
    return this.http.get<ParteDoCorpo[]>(environment.apiUrl + '/parte_do_corpo?' + query).pipe(take(1));
  }
}
