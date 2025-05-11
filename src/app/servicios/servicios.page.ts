import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { cash, cashOutline, cashSharp, eyeOutline, filterOutline, funnelOutline, searchOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { OfertarModalComponent } from '../components/ofertar-modal/ofertar-modal.component';
import { FiltrosComponent } from '../components/filtros/filtros.component';
import { forkJoin } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { CatalogosService } from '../services/catalogos.service';
import { ServiciosService } from '../services/servicios.service';

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
  segmentValue: string = 'porcotizar';

  estados:any[]=[];
  municipios:any[]=[];

  serviciosDisponibles:any[]=[];
  items: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private catalogosService: CatalogosService,
    private serviciosService: ServiciosService,
    private loadingCtrl: LoadingController

  ) {
    addIcons({ cashOutline, cash, cashSharp, searchOutline, funnelOutline, filterOutline });
  }

  async cargarCatalogos() {
    const loading = await this.loadingCtrl.create({
      message: 'Espere...',
      spinner: 'crescent',
    });
    //await loading.present();
  
    forkJoin({
      estados: this.catalogosService.GetEstados(),
      municipios: this.catalogosService.GetMunicipios(),
    }).subscribe({
      next: ({ estados, municipios }) => {
        // Aquí asignas tus datos
        this.estados = estados;
        this.municipios = municipios;
      },
      error: (err) => {
        console.error('Error al cargar catálogos', err);
      },
      complete: () => {
        loading.dismiss();
      }
    });
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

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { estadoId, municipioId, fechaDesde, fechaHasta } = result.data;
        console.log('Filtros:', result.data);

        this.serviciosService.GetServiciosDisponibles(estadoId, municipioId)
        .subscribe({
          next: (response) => {
            this.serviciosDisponibles = response;
            this.items = response;
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

  async abrirModalOferta(servicio:any) {
    const modal = await this.modalCtrl.create({
      component: OfertarModalComponent,
      cssClass: 'custom-modal',
      backdropDismiss: true, // Permite cerrar tocando fuera del modal
      componentProps: {
        servicio: servicio // 👈 Aquí se pasa el objeto al modal
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Oferta enviada:', data);
      if(data == true){
        this.serviciosService.GetServiciosDisponibles(null, null)
        .subscribe({
          next: (response) => {
            this.serviciosDisponibles = response;
            this.items = response;
          },
          complete: () => {
            //this.btnLoading = false;
          },
          error: () => {
            //this.btnLoading = false;
          }
        })
      }
      // Aquí puedes hacer POST al backend o lo que necesites
    }
  }

  enviarOferta() {
    this.modalCtrl.dismiss({
      importe: this.importe,
      comentario: this.comentario
    });
  }

  get filteredItems() {
    return this.items.filter(item => 
      this.segmentValue === 'cotizados' ? item.cotizado : !item.cotizado
    );
  }

  ngOnInit(): void {
    this.checkAppMode();
    this.serviciosService.GetServiciosDisponibles(null, null)
        .subscribe({
          next: (response) => {
            this.serviciosDisponibles = response;
            this.items = response;
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
