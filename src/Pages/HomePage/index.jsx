import React, { useEffect, useState } from 'react';
import Despesa from '../../Components/Despesa';
import Container from '../../Components/Container';
import Copyright from '../../Components/Footer';

import { getUsers } from '../../services/requests';

function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      console.log(response);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <Container>
      <Despesa />
      <Copyright sx={ { mt: 8, mb: 4 } } />
    </Container>
  );
}

export default HomePage;
