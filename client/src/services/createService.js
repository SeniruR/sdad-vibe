// Person 3 (C3) — implement createItem
import { apiPost } from './api';

export async function createItem(data) {
  return apiPost('/items', data);
}
