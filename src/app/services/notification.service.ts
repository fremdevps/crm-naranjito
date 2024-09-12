import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  alertController = inject(AlertController);
  toastController = inject(ToastController);
  loadingController = inject(LoadingController);

  constructor() { }

  async presentAlert(header: string, message: string, buttons: string[] = ['OK']) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons
    });
    await alert.present();
  }

  async presentConfirm(header: string, message: string, confirmHandler: () => void, cancelHandler: () => void = () => { }) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: cancelHandler
        },
        {
          text: 'OK',
          handler: confirmHandler
        }
      ]
    });
    await alert.present();
  }

  async presentToast(message: string, duration: number = 2000, position: 'top' | 'bottom' | 'middle' = 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }

  async presentLoading(message: string = 'Por favor, espere...') {
    const loading = await this.loadingController.create({
      message,
      spinner: 'crescent'
    });
    await loading.present();
    return loading;
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}
