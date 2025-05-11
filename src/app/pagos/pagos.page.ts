import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { cash, cashOutline, cashSharp, documentTextOutline, eyeOutline, fileTrayOutline, filterOutline, funnelOutline, imageOutline, searchOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { OfertarModalComponent } from '../components/ofertar-modal/ofertar-modal.component';
import { FiltrosComponent } from '../components/filtros/filtros.component';
import { forkJoin } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { CatalogosService } from '../services/catalogos.service';
import { ServiciosService } from '../services/servicios.service';
import { PagosService } from '../services/pagos.service';
import { DetallePagoModalComponent } from '../components/detalle-pago-modal/detalle-pago-modal.component';
import { FiltroMesComponent } from '../components/filtro-mes/filtro-mes.component';
import { VerPagoModalComponent } from '../components/ver-pago-modal/ver-pago-modal.component';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PagosPage implements OnInit {

  darkMode = false;
  pagos: any[] = [];
  periodo = (new Date()).toISOString().slice(0, 7);
  filtroEstatus: string = 'todos';
  listaOriginal: any[] = []; // Aquí tienes todos los elementos
  listaFiltrada: any[] = []; // Aquí se guarda la lista filtrada



  constructor(private modalCtrl: ModalController,
    private catalogosService: CatalogosService,
    private pagosService: PagosService
  ) {
    addIcons({ fileTrayOutline, searchOutline, funnelOutline, documentTextOutline, imageOutline, filterOutline });
  }

  filtrarLista() {
    console.log('checamos');
    if (this.filtroEstatus === 'todos') {
      this.listaFiltrada = this.listaOriginal;
    } else {
      this.listaFiltrada = this.listaOriginal.filter(
        item => item.estatus === this.filtroEstatus
      );
    }
  }

  async abrirPdfPago(pagoId: any) {
  const modal = await this.modalCtrl.create({
    component: VerPagoModalComponent,
    componentProps: {
      pagoId: pagoId
    }
  });
  await modal.present();
}

  async abrirFiltros() {
    const modal = await this.modalCtrl.create({
      component: FiltroMesComponent,
      cssClass: 'modal-filtros',
      showBackdrop: true,
      backdropDismiss: true
    });

    modal.onDidDismiss().then((result) => {
      if (result.data.periodo != '') {
        const { periodo } = result.data;
        console.log('Filtros:', result.data);
        this.pagosService.GetPagos(result.data.periodo)
      .subscribe({
        next: (response) => {
          this.listaOriginal = response;
          this.filtrarLista();
        },
        complete: () => {
          //this.btnLoading = false;
        },
        error: () => {
          //this.btnLoading = false;
        }
      })
        
        // Aquí puedes guardar los datos o hacer una búsqueda
      }
    });

    await modal.present();
  }

  async abrirDetallePago(pago: any) {
    const modal = await this.modalCtrl.create({
      component: DetallePagoModalComponent,
      componentProps: {
        pago: pago
      }
    });

    await modal.present();
  }

  ngOnInit(): void {
    this.checkAppMode();
    this.pagosService.GetPagos(this.periodo)
      .subscribe({
        next: (response) => {
          this.listaOriginal = response;
          this.filtrarLista();
        },
        complete: () => {
          //this.btnLoading = false;
        },
        error: () => {
          //this.btnLoading = false;
        }
      })
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
