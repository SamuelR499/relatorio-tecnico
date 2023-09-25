import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-relatorio-tecnico.brgagn.com.br/api/auth',
});

export const createSession = async (email, password) => {
  return api.post('/login', { email, password });
};

export const apiTest = axios.create({
  baseURL: 'https://api-relatorio-tecnico.brgagn.com.br/api/teste',
});

export const getUsers = async () => {
  return apiTest.get('/');
};
