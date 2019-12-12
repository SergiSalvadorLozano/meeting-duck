import { createAction, props } from '@ngrx/store';


export const cardExpanded = createAction(
  '[Help Card Component] Expanded',
  props<{ index: number }>()
);

export const cardContracted = createAction('[Help Card Component] Contracted');
