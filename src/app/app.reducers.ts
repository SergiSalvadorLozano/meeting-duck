import { IReducerGroup } from './shared/models/reducer-group.interface';
import { helpTabReducers } from './modules/help-tab/help-tab.reducers';
import { sharedReducers } from './shared/shared.reducers';


export const appReducers: IReducerGroup = {
  ...helpTabReducers,
  ...sharedReducers
};
