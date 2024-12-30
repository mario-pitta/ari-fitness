import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Tarefa } from 'src/app/adm-page/planejador/planejador.page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  updateStatus(taskId: number, status: number, position: number = 0) {
    return this.http
      .put(environment.apiUrl + '/tarefas/', {
        id: taskId,
        status_tarefa_id: status,
        posicao: position,
      })
      .pipe(take(1));
  }
  constructor(private http: HttpClient) {}

  getByFilters(filters: any) {
    const query = Object.keys(filters)
      .map((k: string) => `${k}=${filters[k]}`)
      .join('&');
    return this.http
      .get<any[]>(environment.apiUrl + '/tarefas?' + query)
      .pipe(take(1));
  }

  create(tarefa: Tarefa) {
    return this.http
      .post<any>(environment.apiUrl + '/tarefas', tarefa)
      .pipe(take(1));
  }

  update(tarefa: Tarefa) {
    return this.http
      .put<any>(environment.apiUrl + '/tarefas', tarefa)
      .pipe(take(1));
  }

  getTiposTarefa() {
    return this.http
      .get(environment.apiUrl + '/tarefas/tipos?fl_ativo=1')
      .pipe(take(1));
  }
}
