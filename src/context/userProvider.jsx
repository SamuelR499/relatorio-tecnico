import React, { useState, useMemo, createContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { apiTest, createSession } from '../services/requests';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    console.log('login', email, password);
    const response = await createSession(email, password);
    const userToken = response.data.data.token;
    console.log('userToken --->>', userToken);
    localStorage.setItem('token', `Bearer ${userToken}`);
    apiTest.defaults.headers.Authorization = `Bearer ${userToken}`;
    setToken(userToken);
    navigate('/');
  }, [navigate]);

  const logout = useCallback(() => {
    console.log('logout');
    apiTest.defaults.headers.Authorization = null;
    localStorage.removeItem('token');
    setToken(null);

    navigate('/login');
  }, [navigate]);

  // Memorize the context object to avoid recreation on every render
  const authContextValue = useMemo(() => ({
    authenticated: !!token, loading, login, logout,
  }), [loading, login, logout, token]);

  return (
    <AuthContext.Provider value={ authContextValue }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
