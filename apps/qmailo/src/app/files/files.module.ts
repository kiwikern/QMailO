import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesListComponent } from './files-list/files-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { EffectsModule } from '@ngrx/effects';
import { QmailFileEffects } from './qmail-file.effects';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from './qmail-file.reducer';
import { FileEditFormComponent } from './file-edit-form/file-edit-form.component';
import { FormsModule } from '@angular/forms';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoadQmailFilesRequest } from './qmail-file.actions';
import { RootState } from '../reducers';
import { FileFormComponent } from './file-form/file-form.component';
import { FileAddFormComponent } from './file-add-form/file-add-form.component';
import { SettingsComponent } from './settings/settings.component';
import { settingsReducer } from './store/settings.reducer';

const fileRoutes: Routes = [
  {path: '', component: FilesListComponent},
  {path: 'edit/:id', component: FileEditFormComponent},
  {path: 'new', component: FileAddFormComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('files', reducer),
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([QmailFileEffects]),
    RouterModule.forChild(fileRoutes),
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    FormsModule
  ],
  declarations: [
    FilesListComponent,
    FileEditFormComponent,
    FabButtonComponent,
    FileFormComponent,
    FileAddFormComponent,
    SettingsComponent
  ]
})
export class FilesModule {
  constructor(store: Store<RootState>) {
    store.dispatch(new LoadQmailFilesRequest());
  }
}
