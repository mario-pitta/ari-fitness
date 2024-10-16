import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Musculo } from 'src/core/models/Musculo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MusculoService {
  constructor(private http: HttpClient) {}

  find(filters?: Musculo | Partial<Musculo>) {
    const query =
      filters &&
      Object.keys(filters).map(
        (k: string) => `${k}=${filters[k as keyof Musculo]}`
      ).join('&') || '';
    // console.log('query');
    return this.http.get<Musculo[]>(environment.apiUrl + '/musculos?' + query);
  }
}
