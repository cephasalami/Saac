import api from './api';

export const login = async (username: string, password: string) => {
  const res = await api.post('/wp-json/jwt-auth/v1/token', {
    username,
    password,
  });
  const token = res.data.token;
  const userRes = await api.get('/wp-json/wp/v2/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { token, user: userRes.data };
};

export const getCurrentUser = async (token: string) => {
  const res = await api.get('/wp-json/wp/v2/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
