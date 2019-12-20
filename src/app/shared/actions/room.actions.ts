import { createAction, props } from '@ngrx/store';
import { Room } from '../models/room.model';
import { IAppError } from '../models/error.interface';


export const roomCreateStarted = createAction(
  '[Room] Create - Started',
  props<{ userName: string }>()
);

export const roomCreateCompleted = createAction(
  '[Room] Create - Completed',
  props<{ room: Room }>()
);

export const roomCreateError = createAction(
  '[Room] Create - Error',
  props<{ error: IAppError }>()
);

export const roomJoinStarted = createAction(
  '[Room] Join - Started',
  props<{ userName: string, roomCode: string }>()
);

export const roomJoinCompleted = createAction(
  '[Room] Join - Completed',
  props<{ room: Room }>()
);

export const roomJoinError = createAction(
  '[Room] Join - Error',
  props<{ error: IAppError }>()
);

export const roomLeaveStarted = createAction(
  '[Room] Leave - Started'
);

export const roomLeaveCompleted = createAction(
  '[Room] Leave - Completed'
);

export const roomLeaveError = createAction(
  '[Room] Leave - Error',
  props<{ error: IAppError }>()
);

export const roomSendPresenceStarted = createAction(
  '[Room] Send presence - Started'
);

export const roomSendPresenceCompleted = createAction(
  '[Room] Send Presence - Completed'
);

export const roomSendPresenceError = createAction(
  '[Room] Send Presence - Error',
  props<{ error: IAppError }>()
);
