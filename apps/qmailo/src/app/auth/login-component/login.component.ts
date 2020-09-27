import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RootState } from '../../reducers';
import { Store } from '@ngrx/store';
import { LoginRequest } from '../auth.actions';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  password: string;

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {

  }

  submit() {
    this.store.dispatch(new LoginRequest({password: this.password}));
  }

}
