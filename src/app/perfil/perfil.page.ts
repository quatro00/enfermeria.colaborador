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
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  darkMode = false;
  perfil:any={};

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkAppMode();
    this.authService.GetPerfil()
        .subscribe({
          next: (response) => {
           this.perfil = response;
          },
          complete: () => {
            //this.btnLoading = false;
          },
          error: () => {
            //this.btnLoading = false;
          }
        })
  }

  async confirmarCerrarSesion() {
  const alert = await this.alertController.create({
    header: 'Cerrar sesión',
    message: '¿Estás seguro de que deseas cerrar sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Sí, cerrar',
        handler: () => {
          localStorage.removeItem('Authorization');
          this.router.navigate(['']);
        }
      }
    ]
  });

  await alert.present();
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
