import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { QmailFileEffects } from './qmail-file.effects';

describe('QmailFileService', () => {
  let actions$: Observable<any>;
  let effects: QmailFileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QmailFileEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(QmailFileEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
