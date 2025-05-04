import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonIcon, IonItem, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCol, IonRow, IonCardContent } from '@ionic/angular/standalone';
import { calendarOutline, checkmarkDoneOutline, notificationsOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonRow, IonCol, IonGrid, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonList, IonItem, IonIcon, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  constructor() { 
    addIcons({ timeOutline, checkmarkDoneOutline, calendarOutline, notificationsOutline });
  }

  ngOnInit() {
  }

}
