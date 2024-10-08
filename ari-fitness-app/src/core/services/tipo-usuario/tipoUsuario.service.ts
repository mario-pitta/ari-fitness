/* eslint-disable prettier/prettier */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoUsuario } from '../../models/TipoUsuario';

@Injectable({
  providedIn: 'root',
})
export class TipoUsuarioService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<TipoUsuario[]> {
    return this.http
      .get<TipoUsuario[]>(environment.apiUrl + '/tipo_usuario?fl_ativo=true')
      .pipe(map(res => {
        return res.sort((a, b) => a.nome.localeCompare(b.nome)).map(t => {
          return {
            ...t,
            nome: t.nome.toUpperCase()
          }
        })
      }), take(1));
  }
}
