import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { QmailFileActionTypes } from '../files/qmail-file.actions';


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private snackBar: InfoSnackBarService) {
  }

  @Effect() login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_REQUEST),
    mergeMap(action =>
      this.http.post<{ jwt: string }>('/api/login', (<any>action).payload).pipe(
        mergeMap(data => this.login(data)),
        catchError(err => this.handleError(err))
      ))
  );

  @Effect() logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => this.router.navigate(['/login'])),
    map(() => ({type: 'LOGOUT_SUCCESS'}))
  );

  private handleError(error) {
    console.log(error);
    if (error.status === 401) {
      this.snackBar.open('SnackBar.Message.Error.WrongPassword');
    } else if (error.status === 0) {
      this.snackBar.open('SnackBar.Message.Error.NoInternetConnection');
    } else if (error.status === 500) {
      this.snackBar.open('SnackBar.Message.Error.ServerError');
    } else if (error.status === 504) {
      this.snackBar.open('SnackBar.Message.Error.ServerNotReachable');
    } else {
      this.snackBar.open('SnackBar.Message.Error.ClientError');
      console.log(error);
    }
    return of({type: AuthActionTypes.LOGIN_FAIL});
  }

  private login(data: { jwt: string }) {
    this.router.navigate(['/files']);
    return [
      {type: AuthActionTypes.LOGIN_SUCESS, payload: data},
      {type: QmailFileActionTypes.LoadQmailFilesRequest}
    ];
  }

}
