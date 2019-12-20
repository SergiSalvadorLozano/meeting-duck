import { IReducerGroup } from 'src/app/shared/models/reducer-group.interface';
import { helpCardExpandedReducers } from './reducers/help-card-expanded.reducers';


export const helpTabReducers: IReducerGroup = {
  ...helpCardExpandedReducers
};
