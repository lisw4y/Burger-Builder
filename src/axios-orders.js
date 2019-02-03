import axios from 'axios';

const instance = axios.create({
  baseURL: 'your firebase url'
});

export default instance;