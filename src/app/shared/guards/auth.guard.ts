import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      if (!localStorage.getItem('token')) {
          this.router.navigate(['/session/login']);
          return false;
        }
        return true;
  }
}
