import React from 'react';

import { Container, CssBaseline, makeStyles } from '@material-ui/core';

import logo from './assets/images/logo.png';
import './App.css';
import { Auth } from 'aws-amplify';

import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import { IUser } from './types';
import HomeScreen from './screens/Home';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    maxWidth: 600,
    marginBottom: 100,
  }
}));

const AuthStateApp = () => {
  const classes = useStyles();
  
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<Partial<IUser> | undefined>();

  React.useEffect(() => {
      onAuthUIStateChange((nextAuthState, authData) => {
          console.log("nextAuthState", nextAuthState);
          console.log("authData", authData);
          setAuthState(nextAuthState);
          setUser(authData);
          Auth.currentSession()
              .then(data => console.log(data))
              .catch(err => console.log(err));
      });
  }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
        <HomeScreen user={user} />
      </div>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} className={classes.logo} alt="logo" />
        <AmplifyAuthenticator>
          <AmplifySignUp 
            slot="sign-up"
            usernameAlias="email"
            // handleSubmit={signUp}
            formFields={[
              {
                type: "username",
                label: "Username",
                placeholder: "username",
                required: true,
              },
              {
                type: "email",
                label: "Email Address",
                placeholder: "Email",
                required: true,
              },
              {
                type: "password",
                label: "Password",
                placeholder: "Password",
                required: true,
              },
              {
                type: "phone_number",
                label: "Phone Number",
                required: true,
              },
              {
                type: "custom:tenant_id",
                label: "Tenant ID",
                placeholder: "Customer Tenant ID",
                required: true,
              },
            ]} 
          />
        </AmplifyAuthenticator>
      </div>
    </Container>
  );
}
export default AuthStateApp;
