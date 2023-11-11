import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import AppBars from '../../Components/AppBars';
import Orders from '../../Components/Orders';

import { requestGet } from '../../services/requests';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await requestGet('/relatorios');
      const { data } = response;
      console.log('oque é isto ??', data);
      setLoading(false);
      setDados(data);
    })();
  }, []);

  return (
    <Box sx={ { display: 'flex' } }>
      <AppBars />
      {loading ? (
        <Box
          component="main"
          sx={ {
            backgroundColor: (theme) => (theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          } }
        >
          <Container maxWidth="lg" sx={ { mt: 10, mb: 4 } }>
            <div
              style={ {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              } }
            >
              <CircularProgress />
            </div>
          </Container>
        </Box>
      ) : (
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
            <Orders data={ dados } />

          </Container>
        </Box>

      )}
    </Box>
  );
}

export default HomePage;
