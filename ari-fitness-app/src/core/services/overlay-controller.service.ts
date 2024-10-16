import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class OverlayControllerService {
  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private toastr: ToastController,
    private router: Router
  ) {}

  closeAll(e: any) {

    // console.log('vai fechar a porra toda !!');

   this.closeModal(e);
   this.closeActionSheet(e);
   this.closeToastr(e);
  }

  closeModal(e: any){
    const el = this.modalController.getTop();
    // console.log(e);
    if (el) {
      this.modalController.dismiss(el);
      return
    }
  }

  closeActionSheet(e: any){
    const el = this.actionSheetController.getTop();
    if (el) {
      this.actionSheetController.dismiss(el);
      return
    }
  }
  closeToastr(e: any){
    const el = this.toastr.getTop();
    if (el) {
      this.toastr.dismiss(el);
      return
    }
  }

}
