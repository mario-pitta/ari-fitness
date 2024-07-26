import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.page.html',
  styleUrls: ['./treinos.page.scss'],
})
export class TreinosPage implements OnInit {
  user: any
  selectedTreino: any;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("user"))));
    this.selectedTreino = this.user.treinos[0]
  }


  onTreinoSelected(event: any){
    this.selectedTreino = this.user.treinos.find((t: any) => t.id === event.detail.value)
    console.log(this.selectedTreino)

  }



}
