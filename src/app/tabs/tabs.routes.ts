import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'servicios',
        loadComponent: () => import('../servicios/servicios.page').then((m) => m.ServiciosPage),
      },
      {
        path: 'pagos',
        loadComponent: () => import('../pagos/pagos.page').then((m) => m.PagosPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('../perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: 'ayuda',
        loadComponent: () => import('../ayuda/ayuda.page').then((m) => m.AyudaPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  }
];
