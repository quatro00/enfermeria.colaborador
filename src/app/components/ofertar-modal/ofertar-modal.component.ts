import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServiciosService } from 'src/app/services/servicios.service';

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
  servicioFechaId:string = '';

  form = {
    comentarios: '',
    oferta: ''
  };

  ngOnInit() {}

  constructor(private modalCtrl: ModalController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private serviciosService: ServiciosService,
  ) {
    this.servicio = this.navParams.get('servicio');
    console.log('Servicio recibido:', this.servicio);
    this.form.oferta = this.servicio.total;
  }

  cerrar(flag:any) {
    this.modalCtrl.dismiss(flag);
  }

  async confirmarEliminacion(servicio: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseas eliminar esta cotización?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler:async () => {

            const loader = await this.loadingCtrl.create({
              message: 'Enviando...',
              spinner: 'crescent',
              backdropDismiss: false
            });
        

            await loader.present();

            this.serviciosService.EliminarCotizacion({servicioFechaId: this.servicio.id}) // o cualquier identificador necesario
            .subscribe({
              next: (response) => {
                loader.dismiss();
                //this.showSuccessAlert();
                this.cerrar(true);
              },
              complete: () => {
                loader.dismiss();
              },
              error: (err) => {
                this.showErrorAlert(err.error);
                //console.log(err);
                loader.dismiss();
              }
            })
          }
        }
      ]
    });
  
    await alert.present();
  }

  async enviarOferta() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar envío',
      message: '¿Deseas enviar esta cotización?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async () => {

            const loader = await this.loadingCtrl.create({
              message: 'Enviando...',
              spinner: 'crescent',
              backdropDismiss: false
            });
        
            let request = {
              servicioFechaId :this.servicio.id,
              comentario: this.form.comentarios,
              monto: this.form.oferta
            }

            await loader.present();

            this.serviciosService.EnviarCotizacion(request)
            .subscribe({
              next: (response) => {
                loader.dismiss();
                //this.showSuccessAlert();
                this.cerrar(true);
              },
              complete: () => {
                loader.dismiss();
              },
              error: (err) => {
                this.showErrorAlert(err.error);
                //console.log(err);
                loader.dismiss();
              }
            })

           
          }
        }
      ]
    });

    await alert.present();
  }

  async showErrorAlert(mensaje:any) {
    const alert = await this.alertCtrl.create({
      //header: '¡Éxito!',
      message: mensaje,
      buttons: ['Aceptar'],
      cssClass: 'danger'
    });
    await alert.present();
  }
  

}
