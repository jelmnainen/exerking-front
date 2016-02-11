import axios from 'axios';

export const createAxios = (accessToken) => {
  const headers = {
    Accept: 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const instance = axios.create({
    baseURL: process.env.API_URL,
    headers,
  });

  return instance;
};
