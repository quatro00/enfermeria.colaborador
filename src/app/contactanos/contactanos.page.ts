import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonButton, IonCard, IonCardHeader, IonCardTitle, IonItem, IonCardContent, IonLabel, IonInput, IonTextarea, IonImg } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular/standalone';
import { LoadingController, AlertController  } from '@ionic/angular/standalone';
import { PublicService } from '../services/public.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
 
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
  standalone: true,
  imports: [IonImg,  IonInput,       IonButton, IonText, IonContent,    CommonModule, FormsModule],
  
})
export class ContactanosPage implements OnInit {
  darkMode = false;

  form = {
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  };

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private publicService:PublicService,
    private alertCtrl: AlertController
  ) {}

  goBack() {
    this.navCtrl.back();
  }


  ngOnInit(): void {
    this.checkAppMode();
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

  async showSuccessAlert() {
    const alert = await this.alertCtrl.create({
      //header: '¡Éxito!',
      message: 'Tu mensaje ha sido enviado correctamente.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async enviarMensaje() {

    const loader = await this.loadingCtrl.create({
      message: 'Procesando...',
      spinner: 'crescent',
      backdropDismiss: false
    });

    await loader.present();

    let mensaje = {
      nombre: this.form.nombre,
      correoElectronico: this.form.correo,
      telefono: this.form.telefono,
      mensaje: this.form.mensaje
    };

    this.publicService.CrearMensaje(mensaje)
    .subscribe({
      next: (response) => {
        this.form = {
          nombre: '',
          correo: '',
          telefono: '',
          mensaje: '' 
        }
        loader.dismiss();
        this.showSuccessAlert();
      },
      complete: () => {
        loader.dismiss();
      },
      error: () => {
        loader.dismiss();
      }
    })

  }

}
