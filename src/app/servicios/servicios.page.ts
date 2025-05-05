import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { cash, cashOutline, cashSharp, eyeOutline, filterOutline, funnelOutline, searchOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { OfertarModalComponent } from '../components/ofertar-modal/ofertar-modal.component';
import { FiltrosComponent } from '../components/filtros/filtros.component';

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
    addIcons({ cashOutline, cash, cashSharp, searchOutline, funnelOutline, filterOutline });
   }

   cerrar() {
    this.modalCtrl.dismiss();
  }

  async abrirFiltros() {
    const modal = await this.modalCtrl.create({
      component: FiltrosComponent,
      cssClass: 'modal-filtros',
      showBackdrop: true,
      backdropDismiss: true
    });
  
    await modal.present();
  }

  async abrirModalOferta() {
    const modal = await this.modalCtrl.create({
      component: OfertarModalComponent,
      cssClass: 'custom-modal',
      backdropDismiss: true // Permite cerrar tocando fuera del modal
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Oferta enviada:', data);
      // Aquí puedes hacer POST al backend o lo que necesites
    }
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
