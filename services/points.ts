import api from './api';

export const addPoint = async (type: string) => {
  try {
    await api.post('/wp-json/saac/v1/points', { type });
  } catch (_e) {}
};

export const getLeaderboard = async () => {
  const res = await api.get('/wp-json/saac/v1/leaderboard');
  return res.data as { user: string; points: number }[];
};

export const getMyPoints = async () => {
  const res = await api.get('/wp-json/saac/v1/points/me');
  return res.data.points as number;
};
