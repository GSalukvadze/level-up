import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from '../actions/users.actions';
import { User} from '../../shared/models/user.interface'
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private userService: UserApiService) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.GetUsersSuccess({ users: users as User[] })),
          catchError(error => of(UserActions.GetUsersFailed({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AddUser),
      mergeMap(action =>
        this.userService.addUser(action.user).pipe(
          map(response => UserActions.AddUserSuccess({ user: response as any })),
          catchError(error => of(UserActions.AddUserFailed({ error })))
        )
      )
    )
  );

updateUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.UpdateUser),
    mergeMap(action =>
      this.userService.updateUser(action.userId, action.user).pipe(
        map(response => UserActions.UpdateUserSuccess({ user: response as any })),
        catchError(error => of(UserActions.UpdateUserFailed({ error })))
      )
    )
  )
);

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.DeleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => UserActions.DeleteUserSuccess({ userId: action.userId })),
          catchError(error => of(UserActions.DeleteUserFailed({ error })))
        )
      )
    )
  );
}