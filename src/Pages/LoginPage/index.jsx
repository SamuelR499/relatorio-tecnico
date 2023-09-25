import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../../context/userProvider';
import Copyright from '../../Components/Footer';

const defaultTheme = createTheme();

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginBtnClick = async (event) => {
    event.preventDefault();
    console.log('submit', { email, password });
    login(email, password);
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
          <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={ { mt: 1 } }>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
            <FormControlLabel
              control={ <Checkbox value="remember" color="primary" /> }
              label="Remember me"
            />
            <Button
              type="Button"
              fullWidth
              variant="contained"
              sx={ { mt: 3, mb: 2 } }
              onClick={ (e) => onLoginBtnClick(e) }
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={ { mt: 8, mb: 4 } } />
      </Container>
    </ThemeProvider>
  );
}
