// user.actions.ts
import { createAction, props } from '@ngrx/store';


export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: any }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const loadFranchiseUser = createAction(
  '[User] Load Franchise User',
  props<{  franchise_id:number }>()
);

export const franchiseUserSuccess = createAction('[User] Franchise User Success', props<{ users: any }>());

export const franchiseUserFailure = createAction('[User] Franchise User Failure', props<{ error: any }>());