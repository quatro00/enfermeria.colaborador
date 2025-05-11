import { Routes } from '@angular/router';
import { LoginRedirectGuard } from './guards/login-redirect.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    canActivate: [LoginRedirectGuard],
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'olvide-contrasena',
    canActivate: [LoginRedirectGuard],
    loadComponent: () => import('./olvide-contrasena/olvide-contrasena.page').then( m => m.OlvideContrasenaPage)
  },
  {
    path: 'contactanos',
    canActivate: [LoginRedirectGuard],
    loadComponent: () => import('./contactanos/contactanos.page').then( m => m.ContactanosPage)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'servicios',
    canActivate: [AuthGuard],
    loadComponent: () => import('./servicios/servicios.page').then( m => m.ServiciosPage)
  },
  {
    path: 'pagos',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pagos/pagos.page').then( m => m.PagosPage)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'ayuda',
    canActivate: [AuthGuard],
    loadComponent: () => import('./ayuda/ayuda.page').then( m => m.AyudaPage)
  },
];
