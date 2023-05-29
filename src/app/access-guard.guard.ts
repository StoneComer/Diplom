import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardGuard implements CanActivate {
  constructor(private router: Router, private store: Store){}
  role = this.store.selectSnapshot(AuthState.getUserInfo).role
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.role == "admin" || this.role == "user"){
      return true;
    }
    else{
      return this.router.navigateByUrl('');
    }
  }
}
