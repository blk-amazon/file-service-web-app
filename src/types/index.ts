import { CognitoIdToken } from "amazon-cognito-identity-js";

export interface IFile {
  key_name: string | null,
  file_name: string | null,
  owner_id: string | null,
  tenant_id: string | null,
  size: Number | null,
	last_modified: string | null,
  url: string | null,
	id_concat?: string | null,
	bucket_name?: string | null,
	
}

export interface IUser {
  id: string,
  username: string,
  email: string,
  isConfirmed: boolean,
  tenantId: string,
};

export interface IAuthContext {
  status: Number,
  user: Partial<IUser>,
  isAuthenticated: boolean,
  login: (username: string, password: string) => Promise<Partial<IUser> | Error>,
  signUp: (params: ISignUpParams) => Promise<any>,
  logout: () => Promise<any>,
  confirmSignup: (username: string, code: string) => Promise<any>,
  requestPasswordReset: (username: string) => Promise<any>,
  resetPassword: (username: string, code: string, password: string) => Promise<any>,
  updateUser: (params: Partial<IUser>) => void,
  restoreSession: () => Promise<any>,
  currentUserToken: () => Promise<CognitoIdToken>,
  resendConfirmationCode: (username: string) => Promise<any>,
};

export interface ISignUpParams {
  username: string,
  password: string,
  attributes: {
    given_name: string,
    family_name: string,
    birthdate: string,
    email: string,
    phone_number: string,
    'custom:member_number'?: string,
  }
};

export interface SubscriptionValue<T> {
  value: { data: T };
}

export interface SubscriptionResponse<T> {
  provider: any,
  value: { data: T }
}
