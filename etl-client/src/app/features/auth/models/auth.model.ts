import {User} from '../../users/models/user.model';

export type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; user: User }
  | { status: 'unauthenticated' };

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface GetLoginUrlPayload {
  redirectUrl: string
}

export interface LoginCallbackPayload {
  code: string,
  redirectPath: string
}
