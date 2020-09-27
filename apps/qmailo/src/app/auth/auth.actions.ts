import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] LOGIN REQUEST',
  LOGIN_SUCESS = '[Auth] LOGIN SUCESS',
  LOGIN_FAIL = '[Auth] LOGIN FAIL',
  LOGOUT = '[Auth] LOGOUT'
}

export class LoginRequest implements Action {
  readonly type = AuthActionTypes.LOGIN_REQUEST;
  constructor(public payload: { password: string }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCESS;
  constructor(public payload: { jwt: string }) {
  }
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
  constructor() {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {
  }
}

export type AuthActions = LoginFail | LoginRequest | LoginSuccess | Logout;
