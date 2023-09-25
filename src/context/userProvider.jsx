import React, { useState, useMemo, createContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { apiTest, createSession } from '../services/requests';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    console.log('login', email, password);
    const response = await createSession(email, password);
    const loggedUser = { email: 'samuel.cr@live.com', password: 12345679 };
    const userToken = response.data.data.token;
    console.log(userToken);

    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('token', userToken);

    apiTest.defaults.headers.Authorization = `Bearer ${userToken}`;
    setUser({ id: '123', email });
    navigate('/');
  }, [navigate]);

  const logout = useCallback(() => {
    console.log('logout');
    apiTest.defaults.headers.Authorization = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser(null);
    navigate('/login');
  }, [navigate]);

  // Memorize the context object to avoid recreation on every render
  const authContextValue = useMemo(() => ({
    authenticated: !!user, user, loading, login, logout,
  }), [loading, login, logout, user]);

  return (
    <AuthContext.Provider value={ authContextValue }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
