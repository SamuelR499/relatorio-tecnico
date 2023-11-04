import React, { useState, useContext, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomizedSnackbars from '../../Components/Alert/CustomizedSnackbars';

import Brgagn from '../../assets/brgang-logo.png';
import { AuthContext } from '../../context/userProvider';
import Copyright from '../../Components/Footer';
import { LightTheme } from '../../themes';

export default function LoginPage() {
  const { login, authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const [message, SetMessage] = useState('');
  const [severity, SetSeverity] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  function isEmailValid() {
    if (!/@/.test(email)) {
      SetSeverity('warning');
      SetMessage(`O e-mail "${email}" deve conter o símbolo @.`);
      setOpen(true);
      setTimeout(() => setOpen(false), +'4000');
    } else if (!/\.[a-zA-Z]{2,4}$/.test(email)) {
      SetSeverity('warning');
      SetMessage(`introduza Uma parte a seguir a "@", "${email}" está incompleto`);
      setOpen(true);
      setTimeout(() => setOpen(false), +'4000');
    }
  }

  const onLoginBtnClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), +'4000');
    // VALIDAÇÃO DE LOGIN
    if (!email) {
      SetSeverity('warning');
      SetMessage('email é requirido');
      setOpen(true);
      setTimeout(() => setOpen(false), +'4000');
    } else if (!emailRegex.test(email)) {
      isEmailValid();
    } else if (!password) {
      SetSeverity('warning');
      SetMessage('senha é requirido');
      setOpen(true);
      setTimeout(() => setOpen(false), +'4000');
    } else {
      try {
        await login(email, password);
      } catch (error) {
        SetSeverity('error');
        SetMessage('senha ou email invalido');
        setOpen(true);
        setTimeout(() => setOpen(false), +'4000');
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onLoginBtnClick(event);
    }
  };

  if (authenticated) {
    return null;
  }

  return (
    <ThemeProvider theme={ LightTheme }>
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
              error={ open }
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
            />
            <TextField
              margin="normal"
              InputLabelProps={ { shrink: true } }
              required
              error={ open }
              fullWidth
              name="password"
              label="Password"
              value={ password }
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ ({ target: { value } }) => setPassword(value) }
              onKeyDown={ handleKeyDown }
            />
            <LoadingButton
              type="Button"
              size="medium"
              sx={ { mt: 3, mb: 2 } }
              fullWidth
              onClick={ (e) => onLoginBtnClick(e) }
              loading={ loading }
              loadingIndicator="Loading…"
              variant="contained"
            >
              <span>Entrar</span>
            </LoadingButton>
            <CustomizedSnackbars
              severity={ severity }
              anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
              open={ open }
              message={ message }
            />
          </Box>
        </Box>
        <Copyright sx={ { mt: 8, mb: 4 } } />
      </Container>
    </ThemeProvider>
  );
}
