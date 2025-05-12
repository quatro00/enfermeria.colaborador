import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { cash, cashOutline, cashSharp, documentTextOutline, eyeOutline, fileTrayOutline, filterOutline, funnelOutline, imageOutline, searchOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-detalle-pago-modal',
  templateUrl: './detalle-pago-modal.component.html',
  styleUrls: ['./detalle-pago-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetallePagoModalComponent  implements OnInit {

  @Input() pago!: any;
  /* 
  pago = {
    id: 34,
    total: 1850,
    fecha: new Date('2025-05-04'),
  };
  */
  detalles = [
    { guardia: 'Juan Pérez', horas: 12, fecha: new Date('2025-04-01'), total: 300 },
    { guardia: 'Ana Torres', horas: 8, fecha: new Date('2025-04-05'), total: 200 },
    { guardia: 'Luis Gómez', horas: 10, fecha: new Date('2025-04-10'), total: 250 },
    { guardia: 'Carla Méndez', horas: 14, fecha: new Date('2025-04-15'), total: 400 },
    { guardia: 'Pedro Ramírez', horas: 16, fecha: new Date('2025-04-20'), total: 700 },
  ];
  
  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
   // console.log(this.pago);
  }

}
