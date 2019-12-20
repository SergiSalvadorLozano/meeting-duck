import { BatchAction } from 'ngrx-batch-action-reducer';
import { Action, createAction } from '@ngrx/store';


/**
 * Compose multiple actions in one.
 * On dispatch, reducers and effects will be triggered only once.
 */
@BatchAction()
export class MultiAction implements Action {
  readonly type = '[General] Multi';
  payload: Action[];
  constructor(
    payload: Action[]
  ) { this.payload = payload; }
}


/**
 * Action to do nothing.
 */
export const noopAction = createAction(
  '[General] Noop'
);
