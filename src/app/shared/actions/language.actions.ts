import { createAction, props } from '@ngrx/store';


export const languageInitStarted = createAction('[Language] Init - Started');

export const languageInitCompleted = createAction('[Language] Init - Completed');

export const languageInitError = createAction('[Language] Init - Error');

export const languageSetStarted = createAction(
  '[Language] Set - Started',
  props<{ languageCode: string }>()
);

export const languageSetCompleted = createAction(
  '[Language] Set - Completed',
  props<{ languageCode: string }>()
);

export const languageSetError = createAction('[Language] Set - Error');
