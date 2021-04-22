import axios from 'axios';

const api = axios.create({
  baseURL: 'https://delivery.leaderaplicativos.com.br/api',
});

export default api;
