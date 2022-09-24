import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private ToastController: ToastController){}


  async ShowToast(message:string,duration: number = 1500){
    const toast = await this.ToastController.create({
      message: message,
      duration: duration,
      position: 'middle',
      color: 'secondary',
      cssClass: "animate__animated animate__fadeIn",
    });
    toast.present();
  }

}
