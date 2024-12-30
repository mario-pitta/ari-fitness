export interface IEmpresa {
  id: string;
  cnpj: string;
  nome: string;
  telefone: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export class Empresa implements IEmpresa {
  id: string;
  cnpj: string;
  nome: string;
  telefone: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  constructor(data: IEmpresa) {
    this.id = data.id;
    this.cnpj = data.cnpj;
    this.nome = data.nome;
    this.telefone = data.telefone;
    this.email = data.email;
    this.cep = data.cep;
    this.logradouro = data.logradouro;
    this.numero = data.numero;
    this.complemento = data.complemento;
    this.bairro = data.bairro;
    this.cidade = data.cidade;
    this.estado = data.estado;
  }
}
