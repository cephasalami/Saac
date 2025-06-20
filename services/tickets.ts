import api from './api';

export interface TicketResponse {
  ticket_id: string;
}

export const getMyTicket = async (): Promise<string> => {
  const res = await api.get<TicketResponse>('/wp-json/saac/v1/ticket');
  return res.data.ticket_id;
};
