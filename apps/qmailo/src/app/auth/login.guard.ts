import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectJwt } from './auth.reducer';
import { RootState } from '../reducers';

@Injectable()
export class LoginGuard implements CanLoad, CanActivate, CanActivateChild {
  private jwt;
  constructor(private store: Store<RootState>,
              private router: Router) {
    store.select(selectJwt).subscribe(jwt => this.jwt = jwt);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.allowsRouteChange();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.allowsRouteChange();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.allowsRouteChange();
  }

  private allowsRouteChange() {
    let allowsRouteChange: boolean;
    if (this.jwt) {
      allowsRouteChange = true;
    } else {
      this.router.navigate(['/login']);
      allowsRouteChange = false;
    }
    return allowsRouteChange;
  }
}
