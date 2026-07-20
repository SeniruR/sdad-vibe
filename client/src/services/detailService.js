// Person 4 (C4) — implement getItem and deleteItem
import { apiGet, apiDelete } from './api';

export async function getItem(id) {
  return apiGet(`/items/${id}`);
}

export async function deleteItem(id) {
  return apiDelete(`/items/${id}`);
}
