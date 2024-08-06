
import { MaskitoDirective } from '@maskito/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Usuario, IUsuario } from 'src/core/models/Usuario';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Subject<Usuario> = new Subject();
  userValue: BehaviorSubject<Usuario> = new BehaviorSubject({} as Usuario)
  constructor(private http: HttpClient) {}

  get getUser () {
    this.userValue.next(JSON.parse(localStorage.getItem('user') as string))
    return this.userValue.value
  }

  private setUser = (user: Usuario | Partial<Usuario>) => {
    localStorage.setItem("user", JSON.stringify(user))
  }

  login(cpf: string, dataNascimento: string | Date) {
    return this.http.get(environment.apiUrl + `/auth/login?cpf=${cpf}&dataNascimento=${dataNascimento}`).pipe(tap((u: any) => {
      if(u instanceof Usuario) this.setUser(u)
    }))
  }


}
