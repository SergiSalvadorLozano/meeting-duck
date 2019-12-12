import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import * as moment from 'moment';
import 'moment/locale/es';
import { Observable, from as rxFrom, throwError as rxThrowError } from 'rxjs';
import * as LanguageActions from '../actions/language.actions';
import { DEFAULT_LANGUAGE_CODE, LANGUAGES } from '../constants/language.constants';
import { LANGUAGE_STORAGE_KEY } from '../constants/storage.constants';



@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  // METHODS

  /**
   * Service constructor.
   */
  constructor(
    private storage: Storage,
    private store: Store<{}>,
    private translate: TranslateService
  ) { }


  /**
   * Sets the default application language.
   * Dispatches an action to set the current language to the last one, or to the browser language if there isn't any.
   * @returns An Observable that completes when the process has finished.
   */
  setInitialAppLanguange(): Observable<void> {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE_CODE);
    return rxFrom(this.storage.get(LANGUAGE_STORAGE_KEY).then(storageLanguageCode => {
      const languageCode = storageLanguageCode || this.translate.getBrowserLang();
      this.store.dispatch(LanguageActions.languageSetStarted({ languageCode }));
    }));
  }


  /**
   * Sets the application language.
   * @param languageCode Target language code (within available languages).
   */
  setLanguage(languageCode: string): Observable<void> {
    if (!!find(LANGUAGES, lang => lang.code === languageCode)) {
      moment.locale(languageCode);
      this.translate.use(languageCode);
      return rxFrom(this.storage.set(LANGUAGE_STORAGE_KEY, languageCode));
    } else {
      return rxThrowError('Error: Language not available');
    }
  }
}
