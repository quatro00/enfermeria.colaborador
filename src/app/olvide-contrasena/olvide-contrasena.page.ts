import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButtons, IonText, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.page.html',
  styleUrls: ['./olvide-contrasena.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonText, IonImg, IonContent, CommonModule, FormsModule]
})
export class OlvideContrasenaPage implements OnInit {

  darkMode = false;
  correoElectronico = '';
  constructor(private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService:AuthService
  ) { }

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit(): void {
    this.checkAppMode();
  }

  async enviarCorreo() {
    const loader = await this.loadingCtrl.create({
      message: 'Enviando...',
      spinner: 'crescent',
      backdropDismiss: false
    });


    await loader.present();

    this.authService.RecuperarContrasena(this.correoElectronico) // o cualquier identificador necesario
      .subscribe({
        next: (response) => {
          loader.dismiss();
          //this.showSuccessAlert();
          
        },
        complete: () => {
          loader.dismiss();
        },
        error: (err) => {
          //this.showErrorAlert(err.error);
          //console.log(err);
          loader.dismiss();
        }
      })

  }
  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    // const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    //console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }



}