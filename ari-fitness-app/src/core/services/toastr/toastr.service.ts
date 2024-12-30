import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastController: ToastController) {}

  async open(args: {
    message: string;
    color: string;
    position: 'top' | 'bottom' | 'middle';
    duration: number;
  }) {
    const toast = await this.toastController.create({
      ...args
    });

    await toast.present();
  }

  success(message: string, position: "top" | "bottom" | "middle" = 'top') {
    this.open({ message, color: 'success', position: position, duration: 5000 });
  }

  error(message: string) {
    this.open({ message, color: 'danger', position: 'top', duration: 5000 });
  }
  warning(message: string) {
    this.open({ message, color: 'warning', position: 'top', duration: 5000 });
  }

  dismiss() {
    this.toastController.dismiss();
  }
}
