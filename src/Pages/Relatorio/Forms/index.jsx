import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBars from '../../../Components/AppBars';
import { LightTheme } from '../../../themes/Light';
import Formulario from '../Formulario';

function Forms() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }
  return (
    <ThemeProvider theme={ LightTheme }>
      <Box sx={ { display: 'flex' } }>
        <AppBars />
        <Box
          component="main"
          sx={ {
            backgroundColor: (theme) => (theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          } }
        >
          <Container maxWidth="lg" sx={ { mt: 10, mb: 4 } }>
            <Formulario />
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Forms;
