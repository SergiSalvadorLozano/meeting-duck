import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError as rxCatchError, map as rxMap, mergeMap as rxMergeMap } from 'rxjs/operators';
import * as LanguageActions from '../actions/language.actions';
import { LanguageService } from '../services/language.service';
import { of as rxOf } from 'rxjs';
import { DEFAULT_LANGUAGE_CODE } from '../constants/language.constants';


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
      rxCatchError(() => rxOf(LanguageActions.languageSetError()))
    );
  });


  /**
   * When there is an error setting the language, set it to default.
   */
  processLanguageSetError$ = createEffect(() => this.actions$.pipe(
    ofType(LanguageActions.languageSetError),
    rxMap(() => LanguageActions.languageSetStarted({ languageCode: DEFAULT_LANGUAGE_CODE }))
  ));


  /**
   * Try initialising the current language and dispatch a completion action.
   * If the process fails, dispatch an error action instead.
   */
  initLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguageActions.languageInitStarted),
    rxMergeMap(() => this.languageService.setInitialAppLanguange()),
    rxMap(() => LanguageActions.languageInitCompleted()),
    rxCatchError(() => rxOf(LanguageActions.languageInitError()))
  ));


  /**
   * Constructor. Take care of necessary injections.
   */
  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) { }

}
