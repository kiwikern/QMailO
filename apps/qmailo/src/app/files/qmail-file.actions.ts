import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { QmailFile } from './qmail-file.model';
import { FilterField, SortOrder } from './qmail-file.reducer';

export enum QmailFileActionTypes {
  ChangeFilterSettings = '[QmailFile] Change Filter Settings',
  ChangeSortSettings = '[QmailFile] Change Sort Settings',
  LoadQmailFiles = '[QmailFile] Load QmailFiles',
  LoadQmailFilesRequest = '[QmailFile] Request Loading QmailFiles',
  LoadQmailFilesFailed = '[QmailFile] Loading QmailFiles Failed',
  AddQmailFileRequest = '[QmailFile] Request Adding QmailFile',
  AddQmailFile = '[QmailFile] Add QmailFile',
  AddQmailFileFailed = '[QmailFile] Adding QmailFile Failed',
  UpsertQmailFile = '[QmailFile] Upsert QmailFile',
  AddQmailFiles = '[QmailFile] Add QmailFiles',
  UpsertQmailFiles = '[QmailFile] Upsert QmailFiles',
  UpdateQmailFileRequest = '[QmailFile] Request Updating QmailFile',
  UpdateQmailFileFailed = '[QmailFile] Updating QmailFile Failed',
  UpdateQmailFile = '[QmailFile] Update QmailFile',
  UpdateQmailFiles = '[QmailFile] Update QmailFiles',
  DeleteQmailFile = '[QmailFile] Delete QmailFile',
  DeleteQmailFileRequest = '[QmailFile] Request Deleting QmailFile',
  DeleteQmailFileFailed = '[QmailFile] Deleting QmailFile Failed',
  DeleteQmailFiles = '[QmailFile] Delete QmailFiles',
  ClearQmailFiles = '[QmailFile] Clear QmailFiles'
}

export class LoadQmailFiles implements Action {
  readonly type = QmailFileActionTypes.LoadQmailFiles;

  constructor(public payload: { qmailFiles: QmailFile[] }) {
  }
}

export class LoadQmailFilesRequest implements Action {
  readonly type = QmailFileActionTypes.LoadQmailFilesRequest;

  constructor() {
  }
}

export class AddQmailFileRequest implements Action {
  readonly type = QmailFileActionTypes.AddQmailFileRequest;

  constructor(public payload: { qmailFile: QmailFile }) {
  }
}

export class AddQmailFile implements Action {
  readonly type = QmailFileActionTypes.AddQmailFile;

  constructor(public payload: { qmailFile: QmailFile }) {
  }
}

export class UpsertQmailFile implements Action {
  readonly type = QmailFileActionTypes.UpsertQmailFile;

  constructor(public payload: { qmailFile: QmailFile }) {
  }
}

export class AddQmailFiles implements Action {
  readonly type = QmailFileActionTypes.AddQmailFiles;

  constructor(public payload: { qmailFiles: QmailFile[] }) {
  }
}

export class UpsertQmailFiles implements Action {
  readonly type = QmailFileActionTypes.UpsertQmailFiles;

  constructor(public payload: { qmailFiles: QmailFile[] }) {
  }
}

export class UpdateQmailFile implements Action {
  readonly type = QmailFileActionTypes.UpdateQmailFile;

  constructor(public payload: { qmailFile: Update<QmailFile> }) {
  }
}

export class UpdateQmailFileRequest implements Action {
  readonly type = QmailFileActionTypes.UpdateQmailFileRequest;

  constructor(public payload: { qmailFile: QmailFile }) {
  }
}

export class UpdateQmailFiles implements Action {
  readonly type = QmailFileActionTypes.UpdateQmailFiles;

  constructor(public payload: { qmailFiles: Update<QmailFile>[] }) {
  }
}

export class DeleteQmailFileRequest implements Action {
  readonly type = QmailFileActionTypes.DeleteQmailFileRequest;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteQmailFile implements Action {
  readonly type = QmailFileActionTypes.DeleteQmailFile;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteQmailFiles implements Action {
  readonly type = QmailFileActionTypes.DeleteQmailFiles;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearQmailFiles implements Action {
  readonly type = QmailFileActionTypes.ClearQmailFiles;
}

export class ChangeSortSettings implements Action {
  readonly type = QmailFileActionTypes.ChangeSortSettings;

  constructor(public payload: { sortAttribute: string, sortOrder: SortOrder}) {
  }
}

export class ChangeFilterSettings implements Action {
  readonly type = QmailFileActionTypes.ChangeFilterSettings;

  constructor(public payload: { filterValue: string, filterField: FilterField}) {
  }
}

export type QmailFileActions =
  LoadQmailFiles
  | LoadQmailFilesRequest
  | AddQmailFile
  | UpsertQmailFile
  | AddQmailFiles
  | UpsertQmailFiles
  | UpdateQmailFile
  | UpdateQmailFiles
  | DeleteQmailFile
  | DeleteQmailFiles
  | ClearQmailFiles;
