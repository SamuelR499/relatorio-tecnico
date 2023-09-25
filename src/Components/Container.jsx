import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBars from './AppBars'

const defaultTheme = createTheme();
function Teste({children}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <AppBars />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          >
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
              {children}
            </Container>
        </Box>
      </Box>
    </ ThemeProvider>
  );
}

export default Teste;