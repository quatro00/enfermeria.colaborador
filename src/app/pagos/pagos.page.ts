import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardContent, IonChip, IonCard, IonCardHeader, IonCardTitle, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
  standalone: true,
  imports: [IonLabel, IonSegmentButton, IonSegment, IonCardTitle, IonCardHeader, IonCard, IonChip, IonCardContent, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PagosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
