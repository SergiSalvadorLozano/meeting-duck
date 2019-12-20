import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { APP_ERRORS } from '../constants/error.constants';
import { MockResponseGroup } from '../models/mock.model';


/**
 * REQUEST: Set user name in the current room.
 * @param inputParams The parameter dictionary to create potential responses.
 * @returns A dictionary of mocked potential API responses to a "set user name" request.
 */
export function setUserName(): MockResponseGroup<void> {
  return new MockResponseGroup({

    /**
     * SUCCESS: User name has been changed successfully.
     * The new name is returned in the response.
     */
    success: () => new HttpResponse<void>({
      status: 200
    }),


    /**
     * ERROR: The target user name is invalid.
     */
    errorInvalidName: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.user.invalidUserName.code }
    }),


    /**
     * ERROR: The target name is already taken in the user's room.
     */
    errorNameExists: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.user.userNameExists.code }
    }),


    /**
     * ERROR: The user is not currently in a room.
     */
    errorNotInRoom: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.room.userNotInRoom.code }
    }),


    /**
     * ERROR: A different, unspecified error has occurred.
     */
    errorGeneric: () => new HttpErrorResponse({
      status: 400
    })

  });

}
