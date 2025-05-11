import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServiciosService } from 'src/app/services/servicios.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver-pago-modal',
  templateUrl: './ver-pago-modal.component.html',
  styleUrls: ['./ver-pago-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PdfViewerModule]
})
export class VerPagoModalComponent  implements OnInit {

  pdfSrc = '';
   @Input() pagoId!: any;
  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.pdfSrc = `${environment.apiBaseUrl}/pagos/descargar-pago?pagoLoteId=${this.pagoId}`;
  }

   cerrar() {
    this.modalCtrl.dismiss();
  }

}
