import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';

import { forkJoin } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-filtro-mes',
  templateUrl: './filtro-mes.component.html',
  styleUrls: ['./filtro-mes.component.scss'],
   standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FiltroMesComponent  implements OnInit {
periodoSeleccionado: string = ''; // Formato esperado: 'yyyy-MM'

  constructor(private modalCtrl: ModalController,
    private catalogosService: CatalogosService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  aplicarFiltros() {
    this.modalCtrl.dismiss({
      periodo:this.periodoSeleccionado
    });
  }
  
  cerrar() {
    this.modalCtrl.dismiss();
  }
}
