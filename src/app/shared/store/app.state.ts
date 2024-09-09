// app.state.ts
import { UserState } from './reducers/current-user.reducer';

export interface AppState {
  user: UserState;
  // other slices of state can be added here
}
