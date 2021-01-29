import React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import { AmplifyAuthenticator, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react';

import CustomContainer from '../components/CustomContainer';

import { ViewState } from '../constants';

import logo from '../assets/images/logo.png';
import { Auth } from 'aws-amplify';

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
    maxWidth: 400
  }
}));

interface LoginFormProps {
}

const LoginForm: React.FunctionComponent<LoginFormProps> = (props) => {
  const classes = useStyles();

  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const [loginError, setLoginError] = React.useState<string>();

  const handleEmailChange = (e: any) => setEmail(e.currentTarget.value);
  const handlePasswordChange = (e: any) => setPassword(e.currentTarget.value);

  return (
    <CustomContainer>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} className={classes.logo} alt="logo" />
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!email || !password}
            onClick={(e) => {
              // e.preventDefault();
              if (email && password) {
                Auth.signIn(email, password)
                .then((response) => {
                  console.log("Logged in...", response);
                })
                .catch((err) => {
                  console.error("Error logging in", err);
                  setLoginError(`Error logging in: ${err.message}`);
                })
              }
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!loginError}
        autoHideDuration={6000}
        onClose={() => {
          setLoginError(undefined);
        }}
        message={loginError}
      />
    </Container>
    </CustomContainer>
  );
}

export default LoginForm;