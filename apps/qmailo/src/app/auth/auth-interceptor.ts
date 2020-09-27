import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectJwt } from './auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private jwt;

  constructor(private store: Store<RootState>) {
    store.select(selectJwt).subscribe(jwt => this.jwt = jwt);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwt) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${this.jwt}`
          }
        });
    }
    return next.handle(req);
  }
}
