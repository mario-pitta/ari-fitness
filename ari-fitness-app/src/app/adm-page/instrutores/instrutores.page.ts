import Constants from 'src/core/Constants';
import { UsuarioService } from './../../../core/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { Usuario } from 'src/core/models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrutores',
  templateUrl: './instrutores.page.html',
  styleUrls: ['./instrutores.page.scss'],
})
export class InstrutoresPage implements OnInit {
  instrutores: Usuario[] | any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getInstrutores(this.auth.getUser.empresa_id as string);
  }

  getInstrutores(empresaId: string) {
    this.usuarioService
      .findByFilters({
        tipo_usuario: Constants.INSTRUTOR_ID,
        fl_ativo: true,
        empresa_id: empresaId,
      })
      .subscribe({
        next: (instrutores) => {
          this.instrutores = instrutores.map((instrutor: any) => ({
            ...instrutor,
            tipo: 'Bodybuilder',
            image_url:
              instrutor.image_url || instrutor.genero === 'F'
                ? 'https://images.pexels.com/photos/13197535/pexels-photo-13197535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                : 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }))
        },
      });
  }

  editarInstrutor(instrutor: any) {
    // Lógica para editar o instrutor
    console.log('Editar instrutor:', instrutor);
  }

  excluirInstrutor(instrutor: any) {
    // Lógica para excluir o instrutor
    console.log('Excluir instrutor:', instrutor);
  }


  openForm(id: number){
    this.router.navigate(['/admin/instrutores/formulario'], { queryParams: { userId: id } });
  }
}
