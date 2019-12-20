import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { APP_ERRORS } from '../constants/error.constants';
import { MockResponseGroup } from '../models/mock.model';
import { IApiRoom } from '../models/room.model';


/**
 * REQUEST: Create a new room and join it with a given user name.
 * @param inputParams The parameter dictionary to create potential responses.
 * @returns A dictionary of mocked potential API responses to a "create room" request.
 */
export function createRoom(inputParams: { userName: string }): MockResponseGroup<IApiRoom> {
  return new MockResponseGroup({

    /**
     * SUCCESS: The room has been created successfully.
     */
    success: (params: { userName: string }) => new HttpResponse<IApiRoom>({
      status: 200,
      body: {
        code: 'mockRoomCode',
        peers: [{ name: params.userName }]
      }
    }),


    /**
     * ERROR: The target user name is invalid.
     */
    errorInvalidName: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.user.invalidUserName.code }
    }),


    /**
     * ERROR: The user is already in a room.
     */
    errorAlreadyInRoom: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.room.userAlreadyInRoom.code }
    }),


    /**
     * ERROR: A different, unspecified error has occurred.
     */
    errorGeneric: () => new HttpErrorResponse({
      status: 400
    })

  }, inputParams);
}


/**
 * REQUEST: Join an existing room with a given user name.
 * @param inputParams The parameter dictionary to create potential responses.
 * @returns A dictionary of mocked potential API responses to a "join room" request.
 */
export function joinRoom(inputParams: { userName: string, roomCode: string }): MockResponseGroup<IApiRoom> {
  return new MockResponseGroup({

    /**
     * SUCCESS: The room has been joined successfully.
     */
    success: (params: { userName: string }) => new HttpResponse<IApiRoom>({
      status: 200,
      body: {
        code: 'mockRoomCode',
        peers: [{ name: params.userName }, {name: 'anotherPeer'}]
      }
    }),


    /**
     * ERROR: The target user name is invalid.
     */
    errorInvalidName: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.user.invalidUserName.code }
    }),


    /**
     * ERROR: The target name is already taken in the target room.
     */
    errorNameExists: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.user.userNameExists.code }
    }),


    /**
     * ERROR: The user is already in a room.
     */
    errorAlreadyInRoom: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.room.userAlreadyInRoom.code }
    }),


    /**
     * ERROR: The target room is full.
     */
    errorFullRoom: () => new HttpErrorResponse({
      status: 403,
      error: { message: APP_ERRORS.room.fullRoom.code }
    }),


    /**
     * ERROR: A different, unspecified error has occurred.
     */
    errorGeneric: () => new HttpErrorResponse({
      status: 400
    })

  }, inputParams);
}


/**
 * REQUEST: Leave the current room.
 * @returns A dictionary of mocked potential API responses to a "leave room" request.
 */
export function leaveRoom(): MockResponseGroup<IApiRoom> {
  return new MockResponseGroup({

    /**
     * SUCCESS: The room has been left successfully.
     */
    success: () => new HttpResponse<IApiRoom>({
      status: 200
    }),


    /**
     * ERROR: The user is not currently in a room.
     */
    errorNotInRoom: () => new HttpErrorResponse({
      status: 404,
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


/**
 * REQUEST: Send a presence reminder to the current room.
 * @returns A dictionary of mocked potential API responses to a "room presence" request.
 */
export function sendRoomPresence(): MockResponseGroup<IApiRoom> {
  return new MockResponseGroup({

    /**
     * SUCCESS: The presence reminder has been sent and acknowledged.
     */
    success: () => new HttpResponse<IApiRoom>({
      status: 200
    }),


    /**
     * ERROR: The user is not currently in a room.
     */
    errorNotInRoom: () => new HttpErrorResponse({
      status: 404,
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
