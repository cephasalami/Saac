import api from './api';

export interface Profile {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export const getMyProfile = async (): Promise<Profile> => {
  const res = await api.get('/wp-json/saac/v1/profile');
  return res.data;
};

export const updateProfile = async (profile: Profile) => {
  await api.post('/wp-json/saac/v1/profile', profile);
};
