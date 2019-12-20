import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { Observable, throwError as rxThrowError, from as rxFrom } from 'rxjs';
import { catchError as rxCatchError, map as rxMap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import * as userApiMocks from '../mocks/user.mock';
import { MockResponseProcessor } from '../models/mock.model';
import { USER_NAME_STORAGE_KEY } from '../constants/storage.constants';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  /**
   * Service constructor.
   */
  constructor(
    private storage: Storage,
    private store: Store<{}>
  ) { }


  // NON-API METHODS

  /**
   * Initialises the user's user name.
   * Dispatches an action to set the user name to the last one, null if there isn't any.
   */
  initUserName(): Observable<void> {
    return rxFrom(this.storage.get(USER_NAME_STORAGE_KEY)).pipe(
      rxMap<string, void>(userName => {
        this.store.dispatch(UserActions.userNameSetStarted({ userName: userName || null }));
      })
    );
  }


  // API METHODS

  /**
   * Requests the API to change the user's user name in the current room.
   * @param userName The target user name.
   * @returns An Observable that completes when the process has finished.
   */
  setUserNameInCurrentRoom(userName: string): Observable<void> {
    return new MockResponseProcessor(userApiMocks.setUserName()).process('success').pipe(
      rxCatchError(error => rxThrowError({
        code: error && error.error && error.error.message ? error.error.message : 'ERROR_GENERIC'
      }))
    );
  }

}
