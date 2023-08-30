import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/users.actions';
import { User } from 'src/app/shared/models/user.interface';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

const UserState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const UsersReducer = createReducer(
  UserState,
  on(UserActions.GetUsers, state => ({ ...state, loading: true })),
  on(UserActions.GetUsersSuccess, (state, { users }) => ({ ...state, users, loading: false, error: null })),
  on(UserActions.GetUsersFailed, (state, { error }) => ({ ...state, loading: false, error })),
  on(UserActions.AddUser, state => ({ ...state, loading: true })),
  on(UserActions.AddUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user], loading: false, error: null })),
  on(UserActions.AddUserFailed, (state, { error }) => ({ ...state, loading: false, error })),
  on(UserActions.UpdateUser, state => ({ ...state, loading: true })),
  on(UserActions.UpdateUserSuccess, (state, { user }) => {
    const updatedUsers = state.users.map(u => u.id === user.id ? user : u);
    return { ...state, users: updatedUsers, loading: false, error: null };
  }),
  on(UserActions.UpdateUserFailed, (state, { error }) => ({ ...state, loading: false, error })),
  on(UserActions.DeleteUser, state => ({ ...state, loading: true })),
  on(UserActions.DeleteUserSuccess, (state, { userId }) => {
    const updatedUsers = state.users.filter(u => u.id !== userId);
    return { ...state, users: updatedUsers, loading: false, error: null };
  }),
  on(UserActions.DeleteUserFailed, (state, { error }) => ({ ...state, loading: false, error }))
);