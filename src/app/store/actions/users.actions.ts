import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.interface';

export enum UserActionsTypes {
  GetUsers = '[USERS] GetUsers',
  GetUsersSuccess = '[USERS] GetUsersSuccess',
  GetUsersFailed = '[USERS] GetUsersFailed',
  AddUser = '[USERS] AddUser',
  AddUserSuccess = '[USERS] AddUserSuccess',
  AddUserFailed = '[USERS] AddUserFailed',
  UpdateUser = '[USERS] UpdateUser',
  UpdateUserSuccess = '[USERS] UpdateUserSuccess',
  UpdateUserFailed = '[USERS] UpdateUserFailed',
  DeleteUser = '[USERS] DeleteUser',
  DeleteUserSuccess = '[USERS] DeleteUserSuccess',
  DeleteUserFailed = '[USERS] DeleteUserFailed',
}

export const GetUsers = createAction(UserActionsTypes.GetUsers);
export const GetUsersSuccess = createAction(UserActionsTypes.GetUsersSuccess, props<{ users: User[] }>());
export const GetUsersFailed = createAction(UserActionsTypes.GetUsersFailed, props<{ error: any }>());

export const AddUser = createAction(UserActionsTypes.AddUser, props<{ user: User }>());
export const AddUserSuccess = createAction(UserActionsTypes.AddUserSuccess, props<{ user: User }>());
export const AddUserFailed = createAction(UserActionsTypes.AddUserFailed, props<{ error: any }>());

export const UpdateUser = createAction(UserActionsTypes.UpdateUser, props<{ userId: number; user: User }>());
export const UpdateUserSuccess = createAction(UserActionsTypes.UpdateUserSuccess, props<{ user: User }>());
export const UpdateUserFailed = createAction(UserActionsTypes.UpdateUserFailed, props<{ error: any }>());

export const DeleteUser = createAction(UserActionsTypes.DeleteUser, props<{ userId: number }>());
export const DeleteUserSuccess = createAction(UserActionsTypes.DeleteUserSuccess, props<{ userId: number }>());
export const DeleteUserFailed = createAction(UserActionsTypes.DeleteUserFailed, props<{ error: any }>());