import { createReducer, on } from '@ngrx/store';
import { IReducerGroup } from '../../../shared/models/reducer-group.interface';
import * as HelpCardComponentActions from '../components/help-card/help-card.actions';


/**
 * Initial state of the reducer.
 */
export const initialState = 0;


const helpCardExpandedReducer = createReducer(
  initialState,

  /**
   * On a cardExpanded action, set the index of the expanded card to the one triggering the action.
   */
  on(HelpCardComponentActions.cardExpanded, (state, { index }) => index),

  /**
   * On a cardCollapsed action, set the index of the expanded card to null.
   */
  on(HelpCardComponentActions.cardCollapsed, state => null)
);


export const helpCardExpandedReducers: IReducerGroup = {
  helpCardExpanded: helpCardExpandedReducer
};
