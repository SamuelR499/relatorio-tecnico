import axios from 'axios';

// login <-----------------------------------------------------------
export const api = axios.create({
  baseURL: 'https://api-relatorio-tecnico.brgagn.com.br/api/auth',
});

export const createSession = async (email, password) => {
  return api.post('/login', { email, password });
};

// get relatorio <-------------------------------------------------------
export const apiTest = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const getRelatorios = async () => {
  return apiTest.get('/relatorio/getAll');
};

// post relatorio <-------------------------------------------------------

export const creatRelatorio = async (payload) => {
  return apiTest.post('/relatorio/', payload);
};
