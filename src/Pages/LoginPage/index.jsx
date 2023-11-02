import React, { useState, useContext } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomizedSnackbars from '../../Components/Alert/CustomizedSnackbars';

import Brgagn from '../../assets/brgang-logo.png';
import { AuthContext } from '../../context/userProvider';
import Copyright from '../../Components/Footer';

const defaultTheme = createTheme();

export default function LoginPage() {
  const { login, authenticated } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, SetHasError] = useState(false);

  const onLoginBtnClick = async (event) => {
    event.preventDefault();
    if (!email || !password || !authenticated) {
      SetHasError(true);
      setTimeout(() => SetHasError(false), +'4000');
    } else {
      login(email, password);
    }
  };

  return (
    <ThemeProvider theme={ defaultTheme }>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={ {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <Avatar sx={ { m: 1, bgcolor: 'InactiveCaption', width: 300, height: 100 } }>
            <img src={ Brgagn } alt="Brgagn Logo" />
          </Avatar>
          <Box component="form" noValidate sx={ { mt: 1 } }>
            <TextField
              margin="normal"
              InputLabelProps={ { shrink: true } }
              required
              error={ hasError }
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
            />
            <TextField
              sx={ { '& .Mui-focused': { color: '#411603' } } }
              margin="normal"
              InputLabelProps={ { shrink: true } }
              required
              error={ hasError }
              fullWidth
              name="password"
              label="Password"
              value={ password }
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
            <Button
              type="Button"
              fullWidth
              variant="contained"
              sx={
                {
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#E8882D',
                  '&:hover': { backgroundColor: '#411603' } }
              }
              onClick={ (e) => onLoginBtnClick(e) }
            >
              Sign In
            </Button>
            <CustomizedSnackbars
              severity="error"
              anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
              open={ hasError }
              message="Email or password is incorrect"
              type="error"
            />
          </Box>
        </Box>
        <Copyright sx={ { mt: 8, mb: 4 } } />
      </Container>
    </ThemeProvider>
  );
}
