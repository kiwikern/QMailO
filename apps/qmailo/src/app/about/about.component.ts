import { Component, OnInit } from '@angular/core';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { ShareService } from '../share.service';

declare function require(moduleName: string): any;

const { version: packageVersion } = require('../../../../../package.json');

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  appVersion: string;

  constructor(
    private snackBar: InfoSnackBarService,
    private shareService: ShareService,
  ) {
    this.appVersion = packageVersion;
  }

  ngOnInit() {}

  share() {
    let wasSuccessful = false;
    if (this.shareService.isWebShareApiAvailable()) {
      this.shareService.shareViaWebApi(
        'QMailO',
        'Organize your .qmail files with QMailO',
        'https://github.com/kiwikern/QMailO',
      );
    } else {
      wasSuccessful = this.shareService.copyToClipboard(
        'https://github.com/kiwikern/QMailO',
      );
      if (wasSuccessful) {
        this.snackBar.open('SnackBar.Message.Info.URLCopied');
      }
    }
  }
}
