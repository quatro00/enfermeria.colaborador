import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { documentTextOutline, fileTrayOutline, filterOutline, funnelOutline, imageOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PagosPage implements OnInit {

  constructor(private modalCtrl: ModalController) 
    {
      addIcons({ fileTrayOutline, searchOutline, funnelOutline, documentTextOutline, imageOutline, filterOutline });
     }

  ngOnInit() {
  }

}
