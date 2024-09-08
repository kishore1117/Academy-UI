// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserSuccess, loadUserFailure } from '../actions/current-user.action';

export interface UserState {
  user: any | null;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
