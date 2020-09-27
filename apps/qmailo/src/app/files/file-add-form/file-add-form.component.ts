import { Component, OnInit } from '@angular/core';
import { selectIsSaving } from '../qmail-file.reducer';
import { Observable } from 'rxjs';
import { AddQmailFileRequest } from '../qmail-file.actions';
import { RootState } from '../../reducers';
import { Store } from '@ngrx/store';
import { QmailFile } from '../qmail-file.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-file-add-form',
  templateUrl: './file-add-form.component.html',
  styleUrls: ['./file-add-form.component.css']
})
export class FileAddFormComponent implements OnInit {

  isSaving$: Observable<boolean>;
  defaultContent$: Observable<string>;

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {
    this.isSaving$ = this.store.select(selectIsSaving);
    // TODO: Why does this not work?
    // this.defaultContent$ = this.store.select(selectDefaultContentSetting);
    this.defaultContent$ = this.store.pipe(map((state: any) => state.settings.defaultContent));
  }

  save(qmailFile: QmailFile) {
    this.store.dispatch(new AddQmailFileRequest({qmailFile}));
  }

}
