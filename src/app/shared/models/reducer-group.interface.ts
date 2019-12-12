import { ActionReducer, Action, State } from '@ngrx/store';


export interface IReducerGroup {
  [key: string]: ActionReducer<any, Action>;
}
