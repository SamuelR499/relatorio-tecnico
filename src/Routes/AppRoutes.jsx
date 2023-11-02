import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import Relatorio from '../Pages/Relatorio';
import Forms from '../Pages/Forms';

import { AuthProvider } from '../context/userProvider';
import Private from './PrivateRoute';

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={ <LoginPage /> } />
          <Route
            exact
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
          <Route
            exact
            path="/relatorio"
            element={
              <Private>
                <Relatorio />
              </Private>
            }
          />
          <Route
            exact
            path="/formulario"
            element={
              <Private>
                <Forms />
              </Private>
            }
          />
          <Route
          exact
          path="/formulario/:id"
          element={
            <Private>
              <Forms />
            </Private>
          }/>
        </Routes>
        

        

      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
