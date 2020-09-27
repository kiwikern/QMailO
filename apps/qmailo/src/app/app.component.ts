import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RootState } from './reducers';
import { Store } from '@ngrx/store';
import { Logout } from './auth/auth.actions';
import { selectJwt } from './auth/auth.reducer';
import { LoadQmailFilesRequest } from './files/qmail-file.actions';
import { InfoSnackBarService } from './info-snack-bar.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  showBackNavigation = false;

  jwt$: Observable<string>;

  constructor(private store: Store<RootState>,
              private snackBar: InfoSnackBarService,
              private router: Router) {
  }

  ngOnInit() {
    this.jwt$ = this.store.select(selectJwt);
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => this.showBackNavigation = /.*(about|new|edit|settings).*/.test(event.url));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  reload() {
    this.store.dispatch(new LoadQmailFilesRequest());
    this.snackBar.open('SnackBar.Message.Info.ReloadingFiles');
  }

}
