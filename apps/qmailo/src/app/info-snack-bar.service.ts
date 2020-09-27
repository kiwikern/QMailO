import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { I18nService } from './i18n.service';

@Injectable()
export class InfoSnackBarService {

  constructor(private snackBar: MatSnackBar,
              private i18n: I18nService) {
  }

  open(message: string, action = 'SnackBar.Action.OK', duration = 5000): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(this.i18n.translate(message), this.i18n.translate(action), {duration});
  }

}
