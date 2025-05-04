import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'olvide-contrasena',
    loadComponent: () => import('./olvide-contrasena/olvide-contrasena.page').then( m => m.OlvideContrasenaPage)
  },
  {
    path: 'contactanos',
    loadComponent: () => import('./contactanos/contactanos.page').then( m => m.ContactanosPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'servicios',
    loadComponent: () => import('./servicios/servicios.page').then( m => m.ServiciosPage)
  },
  {
    path: 'pagos',
    loadComponent: () => import('./pagos/pagos.page').then( m => m.PagosPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'ayuda',
    loadComponent: () => import('./ayuda/ayuda.page').then( m => m.AyudaPage)
  },
];
