import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('Authorization');
    if (token) {
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true }); // o tu ruta principal
      return false;
    }
    return true;
  }
}
