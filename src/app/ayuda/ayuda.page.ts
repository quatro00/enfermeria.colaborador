import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { documentTextOutline, fileTrayOutline, filterOutline, funnelOutline, imageOutline, searchOutline } from 'ionicons/icons';


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AyudaPage implements OnInit {

  darkMode = false;
  
  constructor() { }

  ngOnInit() {
  }

}
