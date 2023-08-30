import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/users.reducer';
import { User } from 'src/app/shared/models/user.interface';

// First, create a feature selector to select the UserState from the store
export const selectUserState = createFeatureSelector<UserState>('users');

// Selector to get the list of users
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state?.users
);

// Selector to get the loading state
export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

// Selector to get the error state
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Selector to get a specific user by ID
export const selectUserById = (userId: number) =>
  createSelector(
    selectUsers,
    (users: User[]) => users.find(user => user.id === userId)
);