import axios from 'axios';

export async function loginPost(endpoint, body) {
  var config = {
    method: 'post',
    url: `https://api-relatorio-tecnico.brgagn.com.br/api/auth${endpoint}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(body)
  };
  const { data } = await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  return data;
}

export async function apiPost(endpoint, body, token) {
  const { data } = await api.post(endpoint, body, { headers: { authorization: token } });
  return data;
}

export async function getData(endpoint) {
  const { data } = await api.get(endpoint);
  return data;
}

export async function apiGet(endpoint, token) {
  const { data } = await api.get(endpoint, { headers: { authorization: token } });
  return data;
}

export async function update(endpoint, body, token) {
  const { data } = await api.put(endpoint, body, { headers: { authorization: token } });
  return data;
}

export async function apiRemove(endpoint, token) {
  const { data } = await api.delete(endpoint, { headers: { authorization: token } });
  return data;
}