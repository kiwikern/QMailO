import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { translations } from '../i18n/i18n';
import { translationsDE } from '../i18n/i18n-de';

@Injectable()
export class I18nService {

  translations;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    if (locale === 'de') {
      this.translations = translationsDE;
    } else {
      this.translations = translations;
    }
  }

  translate(key: string): string {
    if (this.translations[key]) {
      return this.translations[key];
    } else {
      console.warn(`No translation found for key ${key} and locale ${this.locale}.`);
      return key;
    }
  }

}
