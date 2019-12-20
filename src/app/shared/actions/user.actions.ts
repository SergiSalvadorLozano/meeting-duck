import { createAction, props } from '@ngrx/store';
import { IAppError } from '../models/error.interface';


export const userNameInitStarted = createAction(
  '[User] Init name - Started'
);

export const userNameInitCompleted = createAction(
  '[User] Init name - Completed'
);

export const userNameInitError = createAction(
  '[User] Init name - Error',
  props<{ error: IAppError }>()
);

export const userNameSetStarted = createAction(
  '[User] Set name - Started',
  props<{ userName: string }>()
);

export const userNameSetCompleted = createAction(
  '[User] Set name - Completed',
  props<{ userName: string }>()
);

export const userNameSetError = createAction(
  '[User] Set name - Error',
  props<{ error: IAppError }>()
);
