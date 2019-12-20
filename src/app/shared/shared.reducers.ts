import { IReducerGroup } from 'src/app/shared/models/reducer-group.interface';
import { languageReducers } from './reducers/language.reducers';
import { roomReducers } from './reducers/room.reducers';
import { userReducers } from './reducers/user.reducers';


export const sharedReducers: IReducerGroup = {
  ...languageReducers,
  ...roomReducers,
  ...userReducers
};
