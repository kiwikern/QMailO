import { SettingsActions, SettingsActionTypes } from './settings.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface SettingsState {
  defaultContent: string;
}

const persistedDefaultContent = localStorage.getItem('qmailo.defaultContent');
export const initialState: SettingsState = {
  defaultContent: persistedDefaultContent
};

export function settingsReducer(state = initialState, action: SettingsActions): SettingsState {
  switch (action.type) {

    case SettingsActionTypes.SetSettingsProperty:
      const setting = {};
      setting[action.payload.key] = action.payload.value;
      localStorage.setItem(`qmailo.${action.payload.key}`, action.payload.value);
      return Object.assign(state, {}, setting);

    default:
      return state;
  }
}

export const selectSettings = createFeatureSelector<SettingsState>('settings');
export const selectDefaultContentSetting = createSelector(selectSettings, (state: SettingsState) => state.defaultContent);
