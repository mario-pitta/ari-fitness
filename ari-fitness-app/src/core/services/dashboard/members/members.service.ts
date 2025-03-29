import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/core/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardMembersService {
  constructor(private http: HttpClient) {}

  getDashboardMembersData(filters: Partial<IUsuario>): Observable<{
    totalMembers: {
      male: number;
      female: number;
      total: number;
    };
    newMembers: {
      total: number;
      tendency: number;
      male: number;
      female: number;
    };
    memberAtLastMonth: number;
    horarios: {
      [key: string]: number;
    };
  }> {
    const query = Object.keys(filters)
      .map((k: string) => `${k}=${filters[k as keyof IUsuario]}`)
      .join('&');
    return this.http.get<{
      totalMembers: {
        male: number;
        female: number;
        total: number;
      };
      newMembers: {
        total: number;
        tendency: number;
        male: number;
        female: number;
      };
      memberAtLastMonth: number;
      horarios: {
        [key: string]: number;
      };
    }>(environment.apiUrl + '/dashboard/total-members-data?' + query);
  }
}
