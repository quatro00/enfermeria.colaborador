import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ofertar-modal',
  templateUrl: './ofertar-modal.component.html',
  styleUrls: ['./ofertar-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OfertarModalComponent  implements OnInit {
  servicio: any={};
  importe: number = 0;
  comentario: string = '';

  ngOnInit() {}

  constructor(private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.servicio = this.navParams.get('servicio');
    console.log('Servicio recibido:', this.servicio);
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

  

}
