import { createReducer, on } from '@ngrx/store';
import * as LanguageActions from '../actions/language.actions';
import { IReducerGroup } from '../models/reducer-group.interface';


/**
 * Initial state of the reducer.
 */
export const initialState = null;


const currentLanguageReducer = createReducer(
  initialState,

  /**
   * On a languageSetComplete action, change the current language to the given code.
   */
  on(LanguageActions.languageSetCompleted, (state, { languageCode }) => languageCode),

);


export const languageReducers: IReducerGroup = {
  currentLanguage: currentLanguageReducer
};
