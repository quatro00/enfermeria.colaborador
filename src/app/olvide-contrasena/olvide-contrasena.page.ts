import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButtons, IonText, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.page.html',
  styleUrls: ['./olvide-contrasena.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonInput, IonText, IonButtons, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OlvideContrasenaPage implements OnInit {

  darkMode = false;

  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit(): void {
    this.checkAppMode();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    // const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  

}