import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://os.ecrsistemas.com.br/api',
});

// login <-----------------------------------------------------------
export const createSession = async (email, password, endpoint) => {
  return api.post(endpoint, { email, password });
};

// ------------------------------------------------------------------

export const requestGet = async (endpoint) => {
  const token = localStorage.getItem('token');
  return api.get(
    endpoint,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const requestPost = async (endpoint, payload) => {
  const token = localStorage.getItem('token');
  return api.post(
    endpoint,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const requestPut = async (endpoint, payload) => {
  const token = localStorage.getItem('token');
  return api.put(
    endpoint,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const requestDelete = async (endpoint) => {
  const token = localStorage.getItem('token');
  return api.delete(
    endpoint,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
