import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
  SetSettingsProperty = '[Settings] Set Property'
}

export class SetSettingsProperty implements Action {
  readonly type = SettingsActionTypes.SetSettingsProperty;
  payload: {key: string, value: string};

  constructor(key: string, value: string ) {
    this.payload = {key, value};
  }
}

export type SettingsActions = SetSettingsProperty;
