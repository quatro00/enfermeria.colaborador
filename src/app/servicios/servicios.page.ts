import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { cash, cashOutline, cashSharp, eyeOutline, searchOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ServiciosPage implements OnInit {

  darkMode = false;
  importe: number = 0;
  comentario: string = '';

  constructor(
    private modalCtrl: ModalController
  ) {
    addIcons({ cashOutline, cash, cashSharp, searchOutline });
   }

   cerrar() {
    this.modalCtrl.dismiss();
  }

  enviarOferta() {
    this.modalCtrl.dismiss({
      importe: this.importe,
      comentario: this.comentario
    });
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
