import { AuthActions, AuthActionTypes } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface AuthState {
  jwt: string;
}

const persistedJwt = localStorage.getItem('qmailo.jwt');
export const initialState: AuthState = {
  jwt: persistedJwt
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCESS:
      const jwt = (<{payload}>action).payload.jwt;
      localStorage.setItem('qmailo.jwt', jwt);
      return {jwt};
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('qmailo.jwt');
      return {jwt: null};
    default:
      return state;
  }
}

export const authSelector = createFeatureSelector<AuthState>('auth');
export const selectJwt = createSelector(authSelector, (state: AuthState) => state.jwt);
