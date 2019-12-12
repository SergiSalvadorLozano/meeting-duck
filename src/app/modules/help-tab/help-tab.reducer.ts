import { merge } from 'lodash';
import { IReducerGroup } from 'src/app/shared/models/reducer-group.interface';
import { helpCardExpandedReducers } from './reducers/help-card-expanded.reducer';


export const helpTabReducers: IReducerGroup = merge({},
  helpCardExpandedReducers
);
