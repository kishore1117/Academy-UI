// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from "src/app/pages/academy/service/user.service";
import { loadUser, loadUserSuccess, loadUserFailure, franchiseUserSuccess, franchiseUserFailure, loadFranchiseUser } from '../actions/current-user.action';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this.userService.getUser().pipe(
          map(user => loadUserSuccess({ user })),
          catchError(error => of(loadUserFailure({ error })))
        )
      )
    )
  );


  franchiseUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFranchiseUser),
      switchMap( active =>
        this.userService.getFranchiseUser(active.franchise_id).pipe(
          map(users => franchiseUserSuccess({ users })),
          catchError(error => of(franchiseUserFailure({ error })))
        )
      )
    ))


  constructor(
    private actions$: Actions,
    private userService: UserService  
  ) {}
}
