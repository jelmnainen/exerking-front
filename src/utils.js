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

export const filterMap = (map, predicate) => {
  const filtered = {};
  Object.keys(map).forEach(key => {
    const item = map[key];
    if (predicate(item)) {
      filtered[key] = item;
    }
  });
  return filtered;
};
