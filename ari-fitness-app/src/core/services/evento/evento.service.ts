import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from 'src/app/adm-page/calendario/calendario.page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  saveEvento(body: Evento) {
    if(!body.id) delete body.id;

    const method = body.id ? 'put' : 'post';

    return this.http[method](environment.apiUrl + '/evento', body);
  }

  constructor(private http: HttpClient) { }


  getEventos(filtros?: Partial<Evento>) {
    const query = filtros ? Object.keys(filtros).map(k => `${k}=${filtros[k as keyof Evento]}`).join('&') : '';

    return this.http.get<Evento[]>(environment.apiUrl + '/evento?' + query);
  }
}
