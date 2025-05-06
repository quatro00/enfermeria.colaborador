import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonIcon, IonItem, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCol, IonRow, IonCardContent, IonFooter, IonButton, IonText, IonChip, IonAvatar } from '@ionic/angular/standalone';
import { calendarOutline, checkmarkDoneOutline, notificationsOutline, timeOutline } from 'ionicons/icons';
import { ServiciosService } from '../services/servicios.service';

@Component({
  //providers: [ServiciosService],
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonChip, IonText, IonButton, IonFooter, IonCardContent, IonRow, IonCol, IonGrid, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonList, IonItem, IonIcon, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  constructor(
    private serviciosService: ServiciosService
  ) { 
    addIcons({ timeOutline, checkmarkDoneOutline, calendarOutline, notificationsOutline });
  }

  ngOnInit() {
    console.log('ver servicios');
    this.serviciosService.VerServiciosProximos()
    .subscribe({
      next: (response) => {
       console.log(response);
      },
      complete: () => {
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
