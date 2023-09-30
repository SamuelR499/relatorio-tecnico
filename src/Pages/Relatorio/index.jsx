import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import AppBars from '../../Components/AppBars';
import Orders from '../../Components/Orders';

import { getRelatorios } from '../../services/requests';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getRelatorios();
      console.log(response);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={ defaultTheme }>
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
            <Button
              variant="contained"
              position="end"
              onClick={ () => navigate('/formulario') }
            >
              Novo
            </Button>
            <Orders />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;