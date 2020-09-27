import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ShareService {

  navigator: any = navigator;

  constructor(@Inject(DOCUMENT) private document) {
  }

  isWebShareApiAvailable(): boolean {
    return  this.navigator && this.navigator.share;
  }

  shareViaWebApi(title, text, url): boolean {
    if (this.isWebShareApiAvailable()) {
      this.navigator.share({title, text, url});
      return true;
    } else {
      return false;
    }
  }

  copyToClipboard(text: string): boolean {
    let wasSuccessful;
    if (this.document) {
      const textArea = this.document.createElement('textarea');
      textArea.textContent = text;
      this.document.body.appendChild(textArea);
      textArea.select();
      try {
        wasSuccessful = this.document.execCommand('copy');
      } catch (error) {
        console.warn('copy failed', error);
        wasSuccessful = false;
      } finally {
        this.document.body.removeChild(textArea);
      }
    } else {
      console.error('#copyToClipboard: document not available');
      wasSuccessful = false;
    }
    return wasSuccessful;
  }

}
