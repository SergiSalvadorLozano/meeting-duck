import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { find } from 'lodash';
import { of as rxOf } from 'rxjs';
import { catchError as rxCatchError, map as rxMap, mergeMap as rxMergeMap } from 'rxjs/operators';
import * as GeneralActions from '../actions/general.actions';
import * as LanguageActions from '../actions/language.actions';
import { APP_ERRORS } from '../constants/error.constants';
import { DEFAULT_LANGUAGE_CODE } from '../constants/language.constants';
import { IAppError } from '../models/error.interface';
import { LanguageService } from '../services/language.service';


@Injectable()
export class LanguageEffects {

  /**
   * Try setting the language to a given code and dispatch a completion action.
   * If the process fails, dispatch an error action instead.
   */
  setLanguage$ = createEffect(() => {
    let actionLanguageCode: string = null;
    return this.actions$.pipe(
      ofType(LanguageActions.languageSetStarted),
      rxMergeMap(action => {
        actionLanguageCode = action.languageCode;
        return this.languageService.setLanguage(action.languageCode);
      }),
      rxMap(() => LanguageActions.languageSetCompleted({ languageCode: actionLanguageCode })),
      rxCatchError(error => rxOf(LanguageActions.languageSetError({
        error: find(APP_ERRORS.all, (appErr: IAppError) => appErr.code === error.code) || APP_ERRORS.general.generic
      })))
    );
  });


  /**
   * When there is a "language unavailable" error, set it to default instead.
   */
  processLanguageSetError$ = createEffect(() => this.actions$.pipe(
    ofType(LanguageActions.languageSetError),
    rxMap(action => {
      if (action.error === APP_ERRORS.language.unavailable) {
        return LanguageActions.languageSetStarted({ languageCode: DEFAULT_LANGUAGE_CODE });
      } else {
        return GeneralActions.noopAction();
      }
    })
  ));


  /**
   * Try initialising the current language and dispatch a completion action.
   * If the process fails, dispatch an error action instead.
   */
  initLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguageActions.languageInitStarted),
    rxMergeMap(() => this.languageService.setInitialAppLanguange()),
    rxMap(() => LanguageActions.languageInitCompleted()),
    rxCatchError(error => rxOf(LanguageActions.languageInitError({
      error: find(APP_ERRORS.all, (appErr: IAppError) => appErr.code === error.code) || APP_ERRORS.general.generic
    })))
  ));


  /**
   * Constructor. Take care of necessary injections.
   */
  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) { }

}
