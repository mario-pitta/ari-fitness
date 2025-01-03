import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, Observable, Subject, take, tap } from 'rxjs';
import { Usuario, IUsuario } from 'src/core/models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<IUsuario | null> = signal(null);
  userValue: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    this.userValue = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user') as string)
    );
    this.user.set(this.userValue.value);
  }

  get getUser() {
    return this.userValue.value;
  }

  updateUser(user: IUsuario){
    this.setUser(user)
  }

  private setUser(user: IUsuario) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userValue.next(user as IUsuario);
    this.user.set(user);
  }

  login(cpf: string, senha: string | Date) {
    return this.http
      .get(
        environment.apiUrl +
          `/auth/login?cpf=${cpf}&senha=${senha}`
      )
      .pipe(
        map((u: Usuario | any) => {
          u = {
            ...u,
            historico: u.historico || [],
          } as Usuario
          this.setUser(u);
          return u;
        }),
        take(1)
      );
  }

  logout() {
    localStorage.clear();
    this.userValue.next(null);
    location.href = '#/login';
  }



}
