import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonButton, IonCard, IonCardHeader, IonCardTitle, IonItem, IonCardContent, IonLabel, IonInput, IonTextarea, IonImg } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
  standalone: true,
  imports: [IonImg, IonTextarea, IonInput, IonLabel, IonCardContent, IonItem, IonCardTitle, IonCardHeader, IonCard, IonButton, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContactanosPage implements OnInit {
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
