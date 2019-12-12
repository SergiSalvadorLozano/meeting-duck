import { merge } from 'lodash';
import { IReducerGroup } from './shared/models/reducer-group.interface';
import { helpTabReducers } from './modules/help-tab/help-tab.reducer';
import { sharedReducers } from './shared/shared.reducer';


export const appReducers: IReducerGroup = merge({},
  helpTabReducers,
  sharedReducers
);
