import { CognitoIdToken } from "amazon-cognito-identity-js";

export interface IFile {
	id_concat: string | null
	key_name: string | null
	bucket_name: string | null
	last_modified: String | null
	size: Number | null
	tenant_id: string | null
	url: string | null
	user_id: string | null
}

export interface IUser {
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  isConfirmed: boolean,
  data: any,
  attributes: {
    'custom:tenant_id': string
  }
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
