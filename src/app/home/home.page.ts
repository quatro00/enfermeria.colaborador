import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonIcon, IonItem, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCol, IonRow, IonCardContent, IonFooter, IonButton, IonText, IonChip, IonAvatar } from '@ionic/angular/standalone';
import { calendarOutline, checkmarkDoneOutline, notificationsOutline, timeOutline } from 'ionicons/icons';
import { ServiciosService } from '../services/servicios.service';
import { Chart, registerables } from 'chart.js';
import { PagosService } from '../services/pagos.service';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';

Chart.register(...registerables);

@Component({
  //providers: [ServiciosService],
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  serviciosProximos:any[] = [];
  darkMode = false;
   ingresosUltimosMeses = [
    { mes: 'Marzo', total: 3200 },
    { mes: 'Abril', total: 4100 },
    { mes: 'Mayo', total: 2900 }
  ];

  chart: any;

  constructor(
    private serviciosService: ServiciosService,
    private pagosService: PagosService,
    private authService: AuthService
  ) { 
    addIcons({ timeOutline, checkmarkDoneOutline, calendarOutline, notificationsOutline });
  }


  ngAfterViewInit() {
    

    
  }
  

  
  ngOnInit() {
    console.log('usuario',this.authService.getUser());
    this.pagosService.GetGraficaPagos()
    .subscribe({
      next: (response) => {
       console.log('grafica', response);
        const canvas = this.barChart.nativeElement;
        
       this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels:  response.map((item: { mes: string }) => item.mes),
        datasets: [{
          label: 'Ingresos ($)',
          data: response.map((item: { totalMonto: number }) => item.totalMonto),
          backgroundColor: '#3880ff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: context => `$${context.parsed.y}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `$${value}`
            }
          }
        }
      }
    });

      },
      complete: () => {
        
      },
      error: (err) => {
        console.log(err);
      }
    })
    
    this.serviciosService.VerServiciosProximos()
    .subscribe({
      next: (response) => {
       this.serviciosProximos = response;
      },
      complete: () => {
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
