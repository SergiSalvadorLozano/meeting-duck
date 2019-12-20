import { mapKeys, mapValues, merge, values } from 'lodash';
import { IAppError } from '../models/error.interface';


export const APP_ERRORS = {

  /**
   * A merging of all errors. Error keys are redefined as "{{context}}.{{errorKey}}".
   */
  all: {},

  /**
   * General errors.
   */
  general: {
    generic: { code: 'ERROR_GENERIC', message: '$error.$general.generic' } as IAppError
  },

  language: {
    unavailable: { code: 'ERROR_LANGUAGE_UNAVAILABLE', message: '$error.$language.language-unavailable' } as IAppError,
  },

  /**
   * Errors related to the actions of creating, joining or leaving rooms.
   */
  room: {
    fullRoom: { code: 'ERROR_FULL_ROOM', message: '$error.$room.full-room' } as IAppError,
    userAlreadyInRoom: {
      code: 'ERROR_USER_ALREADY_IN_ROOM', message: '$error.$room.user-already-in-room'
    } as IAppError,
    userNotInRoom: { code: 'ERROR_USER_NOT_IN_ROOM', message: '$error.$room.user-not-in-room' } as IAppError
  },

  /**
   * Errors related to user names.
   */
  user: {
    invalidUserName: { code: 'ERROR_INVALID_USER_NAME', message: '$error.$user.invalid-user-name' } as IAppError,
    userNameExists: { code: 'ERROR_USER_NAME_EXISTS', message: '$error.$user.user-name-exists' } as IAppError,
  }
};


APP_ERRORS.all = merge({}, ...values(mapValues(APP_ERRORS, (contextErrors, context) =>
  mapKeys(contextErrors, (error, errorKey) => `${context}.${errorKey}`)))) as { [key: string]: IAppError };

