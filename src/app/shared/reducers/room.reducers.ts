import { createReducer, on, State, Action } from '@ngrx/store';
import * as RoomActions from '../actions/room.actions';
import { IReducerGroup } from '../models/reducer-group.interface';


/**
 * Initial state of the reducer.
 */
export const initialState = null;


const currentRoomReducer = createReducer(
  initialState,

  /**
   * On a roomCreateCompleted action, change the current room to the given one.
   */
  on(RoomActions.roomCreateCompleted, (state, { room }) => room),

  /**
   * On a roomJoinCompleted action, change the current room to the given one.
   */
  on(RoomActions.roomJoinCompleted, (state, { room }) => room),

  /**
   * On a roomLeaveCompleted action, change the current room null.
   */
  on(RoomActions.roomLeaveCompleted, state => null),

);


export const roomReducers: IReducerGroup = {
  currentRoom: currentRoomReducer
};
