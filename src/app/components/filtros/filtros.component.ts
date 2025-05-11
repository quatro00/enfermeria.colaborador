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
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FiltrosComponent implements OnInit {

  estados: any[] = [];
  municipios: any[] = [];

  estadoSeleccionado: string | null = null;
  municipioSeleccionado: string | null = null;
  municipiosFiltrados: any[] = [];

  constructor(private modalCtrl: ModalController,
    private catalogosService: CatalogosService,
    private loadingCtrl: LoadingController) { }

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

  cargarMunicipios() {
    this.municipiosFiltrados = this.municipios.filter(
      m => m.estadoId === this.estadoSeleccionado
    );
    this.municipioSeleccionado = null;
  }

  aplicarFiltros() {
    this.modalCtrl.dismiss({
      estadoId: this.estadoSeleccionado,
      municipioId: this.municipioSeleccionado
    });
  }
  
  cerrar() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.cargarCatalogos();
  }

}
