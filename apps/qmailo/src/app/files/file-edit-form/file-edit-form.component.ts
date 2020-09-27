import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QmailFile } from '../qmail-file.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers';
import { selectById, selectIsLoading, selectIsSaving } from '../qmail-file.reducer';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { DeleteQmailFileRequest, UpdateQmailFileRequest } from '../qmail-file.actions';
import { InfoSnackBarService } from '../../info-snack-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-edit-form',
  templateUrl: './file-edit-form.component.html',
  styleUrls: ['./file-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileEditFormComponent implements OnInit {

  file$: Observable<QmailFile>;
  isLoading$: Observable<boolean>;
  isSaving$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: InfoSnackBarService,
              private store: Store<RootState>) {
  }

  ngOnInit() {
    this.isSaving$ = this.store.select(selectIsSaving);
    this.isLoading$ = this.store.select(selectIsLoading);

    const idParam$ = this.route.params.pipe(
      map(params => params.id)
    );

    this.file$ = this.isLoading$.pipe(
      filter(isLoading => !isLoading),
      switchMap(() => idParam$),
      switchMap(id => this.store.select(selectById(id))),
      tap(file => this.checkFile(file))
    );
  }

  save(qmailFile: QmailFile) {
    this.store.dispatch(new UpdateQmailFileRequest({qmailFile}));
  }

  delete(id: string) {
    const snackBarRef = this.snackBar.open('SnackBar.Message.Confirmation.DeleteFile', 'SnackBar.Action.DeleteFile');
    snackBarRef.onAction().subscribe(() => this.store.dispatch(new DeleteQmailFileRequest({id})));
  }

  private checkFile(file) {
    if (!file) {
      console.warn(`File could not be found.`, this.router.url);
      this.router.navigate(['/files']);
    }
  }

}
