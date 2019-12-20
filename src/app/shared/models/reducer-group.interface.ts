import { ActionReducer, Action } from '@ngrx/store';


export interface IReducerGroup {
  [key: string]: ActionReducer<any, Action>;
}
