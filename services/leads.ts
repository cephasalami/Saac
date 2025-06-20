import api from './api';

export interface LeadPayload {
  attendee_id: string;
}

export const saveLead = async (payload: LeadPayload) => {
  await api.post('/wp-json/saac/v1/leads', payload);
};
