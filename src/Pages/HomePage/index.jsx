import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/userProvider';
import Dashboard from '../../Components/Dashboard';
import Container from '../../Components/Container';
import Copyright from '../../Components/Footer';

import { getUsers } from '../../services/requests';

function HomePage() {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      console.log(response);
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <Container>
      <Dashboard />
      <Copyright sx={ { mt: 8, mb: 4 } } />
      <h1>HomePage</h1>
      <button type="button" onClick={ handleLogout }>Logout</button>
      <ul>
        {
          users.map((user) => (
            <li key={ user.razao }>
              {user.razao}
              {' '}
              -
              {' '}
              {user.endereco}
            </li>
          ))
        }
      </ul>
    </Container>
  );
}

export default HomePage;
