import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://Localhost:3333',
})