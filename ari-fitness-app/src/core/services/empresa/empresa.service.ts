import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/core/models/Empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpresa(empresaId: string) {
    return this.http.get(environment.apiUrl + '/empresa/' + empresaId);
  }

  createEmpresa(empresa: Empresa) {
    return this.http.post(environment.apiUrl + '/empresa', empresa);
  }

  updateEmpresa(empresa: Empresa) {
    return this.http.put(environment.apiUrl + '/empresa/' + empresa.id, empresa);

  }
}
