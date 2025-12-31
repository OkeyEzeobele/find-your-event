import { api } from './client';

export async function getEvents() {
  const res = await api.get('/events');
  return Array.isArray(res?.data) ? res.data : [];
}
