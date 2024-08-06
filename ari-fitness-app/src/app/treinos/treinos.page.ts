import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import { TreinoExercicioFormPage } from '../treino-exercicio-form/treino-exercicio-form.page';

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.page.html',
  styleUrls: ['./treinos.page.scss'],
})
export class TreinosPage implements OnInit {
  user!: Usuario;
  selectedTreino: any;
  interval: number = 15;
  openModal: boolean = false;

  constructor(private auth: AuthService, private modalController: ModalController) {}

  ngOnInit() {
    this.user = this.auth.getUser;
    console.log(this.user);
    // this.selectedTreino = this.user.treinos && this.user.treinos[0];
  }

  onTreinoSelected(event: any) {
    // this.selectedTreino = this.user.treinos.find(
    //   (t: any) => t.id === event.detail.value
    // );
    // console.log(this.selectedTreino);
  }

  setInterval(e: any) {
    this.interval = e.value;
    console.log(this.interval);
    console.log(this.interval);
  }

  enableRotation(el: any) {
    el.target.style.setProperty('--rotation-duration', `${this.interval}s`);
    el.target.style.setProperty('--color', `warning`);
    el.target.classList.toggle('clock-animated');

    setTimeout(() => {}, this.interval);
  }



  openClock() {
    alert("vai abrir o cronometro!")
  }

  closeClock() {}

  openTreinoForm() {
    this.modalController.create({
      component: TreinoExercicioFormPage
    }).then(modal => {
      modal.present();
    })

  }
}
