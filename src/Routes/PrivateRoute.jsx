import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/userProvider';

export default function Private({ children }) {
  const { authenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div className="loading">Carregando..</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

Private.propTypes = {
  children: PropTypes.node.isRequired,
};
