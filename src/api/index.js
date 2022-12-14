import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use(async function (config) {
  const tkn = await localStorage.getItem('token');
  const token = JSON.parse(tkn);

  config.headers.authorization = token ? `Bearer ${token}` : null;
  return config;
});

export default API;
