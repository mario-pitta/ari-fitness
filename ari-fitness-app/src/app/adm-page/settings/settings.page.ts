import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  cards: {
    title: string,
    subtitle: string,
    icon: string,
    path: string,

  }[] = [
    {
      title: 'Meu Usuário',
      subtitle: 'Edite seus dados pessoais',
      icon: 'person',
      path: 'perfil'
    },
    {
      title: 'Minha Empresa',
      subtitle: 'Edite seus dados da empresa',
      icon: 'business',
      path: 'empresa'
    },
    {
      title: 'Configurações',
      subtitle: 'Edite suas configurações e preferências',
      icon: 'settings',
      path: ''
    },
    {
      title: 'Ajuda',
      subtitle: 'Acesse nossa central de ajuda',
      icon: 'help',
      path: ''
    },
    {
      title: 'Sobre',
      subtitle: 'Informações sobre a plataforma e a empresa',
      icon: 'information-circle',
      path: ''
    },
    {
      title: 'Sair',
      subtitle: 'Já vai?',
      icon: 'log-out',
      path: ''
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}
