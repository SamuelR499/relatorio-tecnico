import { ThemeProvider } from '@mui/material';
import AppRoutes from './Routes/AppRoutes';
import { LightTheme } from './themes';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={ LightTheme }>
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
