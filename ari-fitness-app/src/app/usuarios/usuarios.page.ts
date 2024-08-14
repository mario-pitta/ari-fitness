import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Constants from 'src/core/Constants';
import { Usuario } from 'src/core/models/Usuario';
import { UsuarioService } from 'src/core/services/usuario/usuario.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  Constants = Constants;
  tipoSelected: number | string = Constants.ALUNO_ID;
  usuarioList: Usuario[] = [];
  isOpen: boolean = false;
selectedUsuario: any;
  constructor(private usuarioService: UsuarioService, private router: Router, private modalController: ModalController) {}

  ngOnInit() {
    this.getUsuarios();
  }

  changeTipoUsuario(e: any) {
    this.tipoSelected = e.detail.value;
    this.getUsuarios(this.tipoSelected);
  }

  getUsuarios(tipoUsuario: number | string = Constants.ALUNO_ID) {
    this.usuarioService.findByFilters({ tipo_usuario: tipoUsuario }).subscribe({
      next: (res) => {
        this.usuarioList = res.map((u: Usuario) => {
          return {
            ...u,
            idade:
              new Date().getFullYear() -
              new Date(u.data_nascimento).getFullYear(),
          };
        });
      },
    });
  }

  showNavigationOptions(usuario: Usuario){
    this.isOpen = true;
    this.selectedUsuario = usuario;
  }

  navigate(path: string, user: Usuario){
    this.isOpen = false;
    setTimeout(() => {
      this.router.navigate([path], {queryParams: {userId: user.id}})
    },80)
  }
}

