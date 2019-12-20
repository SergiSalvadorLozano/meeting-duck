import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNil, find } from 'lodash';
import { of as rxOf } from 'rxjs';
import {
  catchError as rxCatchError, map as rxMap, mergeMap as rxMergeMap,
  withLatestFrom as rxWithLatestFrom
} from 'rxjs/operators';
import * as GeneralActions from '../actions/general.actions';
import * as RoomActions from '../actions/room.actions';
import * as UserActions from '../actions/user.actions';
import { APP_ERRORS } from '../constants/error.constants';
import { IAppError } from '../models/error.interface';
import { Room } from '../models/room.model';
import { UserApiService } from '../services/user.api.service';


@Injectable()
export class UserEffects {

  /**
   * Try setting the user name to a given one and dispatch a completion action.
   * If the user is in a room, trigger an API update, otherwise complete the change directly.
   * If the API call fails with a USER_NOT_IN_ROOM error, update local room and complete name change.
   * If the process fails for another reason, dispatch an error action instead.
   */
  setUserName$ = createEffect(() => {
    let actionUserName: string = null;
    return this.actions$.pipe(
      ofType(UserActions.userNameSetStarted),
      rxWithLatestFrom(this.store),
      rxMergeMap(([action, storeState]) => {
        actionUserName = action.userName;
        return isNil(storeState.currentRoom)
          ? rxOf(null)
          : this.userApiService.setUserNameInCurrentRoom(actionUserName);
      }),
      rxMap(() => UserActions.userNameSetCompleted({ userName: actionUserName })),
      rxCatchError(error => {
        if (error.code === APP_ERRORS.room.userNotInRoom.code) {
          return rxOf(new GeneralActions.MultiAction([
            RoomActions.roomLeaveCompleted(),
            UserActions.userNameSetCompleted({ userName: actionUserName })
          ]));
        }
        return rxOf(UserActions.userNameSetError({
          error: find(APP_ERRORS.all, (appErr: IAppError) => appErr.code === error.code) || APP_ERRORS.general.generic
        }));
      })
    );
  });


  /**
   * Try initialising the user name and dispatch a completion action.
   * If the process fails, dispatch an error action instead.
   */
  initUserName$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.userNameInitStarted),
    rxMergeMap(() => this.userApiService.initUserName()),
    rxMap(() => UserActions.userNameInitCompleted()),
    rxCatchError(() => rxOf(UserActions.userNameInitError({ error: APP_ERRORS.general.generic })))
  ));


  /**
   * Constructor. Take care of necessary injections.
   */
  constructor(
    private actions$: Actions,
    private userApiService: UserApiService,
    private store: Store<{ currentRoom: Room }>
  ) { }

}
