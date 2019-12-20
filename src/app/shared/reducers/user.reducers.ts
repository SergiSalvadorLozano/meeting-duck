import { createReducer, on, State, Action } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { IReducerGroup } from '../models/reducer-group.interface';


/**
 * Initial state of the reducer.
 */
export const initialState = null;


const userNameReducer = createReducer(
  initialState,

  /**
   * On a userNameSetComplete action, change the user name to the given one.
   */
  on(UserActions.userNameSetCompleted, (state, { userName }) => userName),

);


export const userReducers: IReducerGroup = {
  userName: userNameReducer
};
