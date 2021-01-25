import React from 'react';

import Auth from '@aws-amplify/auth';

import { ViewState } from '../constants';

import { createCtx } from '../utils/helpers';

import { Store } from '../store/persistent-store';

import { merge } from 'lodash';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { IAuthContext, IUser, ISignUpParams } from '../types';

const [useAuth, Provider] = createCtx<IAuthContext>();

const AuthProvider: React.FunctionComponent = (props) => {
// function AuthProvider(props) {
  const [status, setStatus] = React.useState<Number>(ViewState.Idle);
  const [user, setUser] = React.useState<Partial<IUser>>({});
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    // only store certain values in device
    const json = JSON.stringify({
      id: user.id,
      isConfirmed: user.isConfirmed,
    });
    
    console.log("json!", json);
    Store.setItem('user', json);
  }, [user]);

  const authContext: IAuthContext = {
      status: status,
      user: user,
      isAuthenticated: isAuthenticated,
      updateUser: async (params: Partial<IUser>) => {

        if (params === null) {
          setUser({});
        } else {
          const updatedUser = merge({}, user, params);
          console.log("updatedUser", updatedUser);
          setUser(updatedUser);          
        }
    
      },
      login: (username: string, password: string) => {
        console.log("logging in...");
        setStatus(ViewState.Busy);
        return new Promise((resolve, reject) => {
          Auth.signIn(username, password)
          .then((response) => {
            setStatus(ViewState.Success);
            setAuthenticated(true);
            resolve(response);
          })
          .catch((err) => {
            setStatus(ViewState.Error);
            reject(err);
          })
        });
      },
      logout: () => {
        console.log("logging out...");
        setStatus(ViewState.Busy);
        return new Promise((resolve, reject) => {
          Auth.signOut()
          .then((response) => {
            setStatus(ViewState.Success);
            setAuthenticated(false);
            resolve(response);
          })
          .catch((err) => {
            setStatus(ViewState.Error);
            reject(err);
          });
        });
      },
      signUp: (params: ISignUpParams) => {
        console.log("registering user...");
        setStatus(ViewState.Busy);
        return new Promise((resolve, reject) => {
          Auth.signUp(params)
          .then((response) => {
            setStatus(ViewState.Success);
            resolve(response);
          })
          .catch((err) => {
            setStatus(ViewState.Error);
            reject(err);
          })
        });
      },
      restoreSession: () => {
        setStatus(ViewState.Busy);
        return new Promise((resolve, reject) => {
          Auth.currentAuthenticatedUser({
              bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          })
          .then((response) => {
            setStatus(ViewState.Success);
            setAuthenticated(true);
            resolve(response);
          })
          .catch((err) => {
            setStatus(ViewState.Error);
            reject(err);
          });
        });
      },
      confirmSignup: (username: string, code: string) => {
        setStatus(ViewState.Busy);
        return new Promise((resolve, reject) => {
          Auth.confirmSignUp(username, code)
          .then(async (response) => {
            setStatus(ViewState.Success);
            Auth.currentAuthenticatedUser()
            .then((response) => {
              console.log("currentAuthenticatedUser", response);
            })
            resolve(response);
          })
          .catch((err) => {
            setStatus(ViewState.Error);
            reject(err);
          });
        });
      },
      requestPasswordReset: (username: string) => {
        setStatus(ViewState.Busy);
        return new Promise((resolve, reject) => {
          Auth.forgotPassword(username)
          .then(async (response) => {
            setStatus(ViewState.Success);
            resolve(response);
          })
          .catch((err) => {
            setStatus(ViewState.Error);
            reject(err);
          });
        });
      },
      resetPassword: (username: string, code: string, password: string) => {
        setStatus(ViewState.Busy);
        return new Promise((resolve, reject) => {
          Auth.forgotPasswordSubmit(username, code, password)
          .then(async (response) => {
            setStatus(ViewState.Success);
            resolve(response);
          })
          .catch((err) => {
            setStatus(ViewState.Error);
            reject(err);
          });
        });
      },
      currentUserToken: () => {
        return new Promise((resolve, reject) => {
          Auth.currentSession()
          .then((response: CognitoUserSession) => {
            if (response.isValid()) {
              const token = response.getIdToken();
              console.log(token);
              resolve(token);
            } else {
              setAuthenticated(false);
              reject("Session not valid");
            }
            
          })
          .catch((err) => {
            setAuthenticated(false);
            reject(err);
          })
        })
      },
      resendConfirmationCode: (username: string) => {
        return new Promise((resolve, reject) => {
          Auth.resendSignUp(username)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          })
        })
      }
  }

  return (
    <Provider value={authContext} {...props}></Provider>
  )
}

export { AuthProvider, useAuth };