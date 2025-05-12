import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButtons, IonText, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingController, AlertController  } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonButton, IonInput, IonText,  IonImg, IonContent,    CommonModule, FormsModule, RouterModule]
})
export class LoginPage implements OnInit {

  darkMode = false;

  form = {
    correoElectronico: 'josecarlosgarciadiaz@gmail.com',
    password: 'suikoden'
  };

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService:AuthService,
  ) {}

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

  async showErrorAlert(mensaje:any) {
    const alert = await this.alertCtrl.create({
      //header: '¡Éxito!',
      message: mensaje,
      buttons: ['Aceptar'],
      cssClass: 'danger'
    });
    await alert.present();
  }

  async login() {

    const loader = await this.loadingCtrl.create({
      message: 'Procesando...',
      spinner: 'crescent',
      backdropDismiss: false
    });

    loader.present();



    let login = {
      Username: this.form.correoElectronico,
      Password: this.form.password,
      remember: true
    };

    this.authService.Login(login)
    .subscribe({
      next: (response) => {
        this.form = {
          correoElectronico: '',
          password: ''
        }
        loader.dismiss();
        localStorage.setItem('Authorization',`Bearer ${response.token}`);
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
        //this.showSuccessAlert();
      },
      complete: () => {
        loader.dismiss();
      },
      error: (err) => {
        this.showErrorAlert(err.error.errors.error[0]);
        loader.dismiss();
      }
    })
    
    // Aquí colocas tu lógica de autenticación, y si es válida:
    //this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }

}
