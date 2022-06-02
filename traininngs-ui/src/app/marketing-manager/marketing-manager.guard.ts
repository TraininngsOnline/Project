import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketingManagerGuard implements CanActivate {
  constructor(private readonly router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') && localStorage.getItem('role') === 'manager') {
      return true;
    } else {
      this.router.navigate(['/marketing-manager/login']);
      return false;
    }
  }
  
}
