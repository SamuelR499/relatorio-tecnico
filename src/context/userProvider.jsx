import React, { useState, useMemo, createContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { api, createSession } from '../services/requests';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const recoveredUser = localStorage.getItem('token');
    if (recoveredUser) {
      setToken(recoveredUser);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await createSession(email, password, '/auth/login');
    const userToken = response.data.data.token;

    api.defaults.headers.Authorization = `Bearer ${userToken}`;

    localStorage.setItem('token', `Bearer ${userToken}`);
    setToken(userToken);

    navigate('/');
  }, [navigate]);

  const logout = useCallback(() => {
    console.log('logout');
    api.defaults.headers.Authorization = null;
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
