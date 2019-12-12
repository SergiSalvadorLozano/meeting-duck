import { merge } from 'lodash';
import { IReducerGroup } from 'src/app/shared/models/reducer-group.interface';
import { languageReducers } from './reducers/language.reducer';


export const sharedReducers: IReducerGroup = merge({},
  languageReducers
);
