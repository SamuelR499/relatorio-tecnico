import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// login <-----------------------------------------------------------
export const createSession = async (email, password, endpoint) => {
  return api.post(endpoint, { email, password });
};

// listar relatorio <-------------------------------------------------------

export const getRelatorios = async (endpoint) => {
  return api.get(endpoint);
};

// criar relatorio <-------------------------------------------------------

export const creatRelatorio = async (payload) => {
  return api.post('/relatorio/', payload);
};

// criar despesa <-------------------------------------------------------

export const creatDespesa = async (payload) => {
  return api.post('/despesas/', payload);
};
