import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Usuario } from 'src/core/models/Usuario';
import { environment } from 'src/environments/environment';
console.log(environment.apiUrl)
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  create(usuario: Usuario) {
    delete usuario.id;
    delete usuario.created_at;
    return this.http
      .post<Usuario>(environment.apiUrl + '/usuario', usuario)
      .pipe(take(1));
  }

  findByFilters(filters: Partial<Usuario> | Usuario) {
    const query = Object.keys(filters).map(
      (k: string) => `${k}=${filters[k as keyof Usuario]}`
    );

    return this.http
      .get<Usuario[]>(environment.apiUrl + '/usuario/search?' + query)
      .pipe(take(1));
  }
}
