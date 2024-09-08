// user.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from '../reducers/current-user.reducer';

export const selectUserState = (state: AppState) => state.user;

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
