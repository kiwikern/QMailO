import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers';
import { SetSettingsProperty } from '../store/settings.actions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  defaultContent$: Observable<string>;

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {
    // TODO: Why does it not work? Compare file-add-form-component.ts
    // this.defaultContent$ = this.store.select(selectDefaultContentSetting);
    this.defaultContent$ = this.store.pipe(map((state: any) => state.settings.defaultContent));
  }

  changeSetting(key: string, value: string) {
    this.store.dispatch(new SetSettingsProperty(key, value));
  }

}
