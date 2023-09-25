import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
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
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
