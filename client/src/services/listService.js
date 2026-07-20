// Person 2 (C2) — implement fetchList
import { apiGet } from './api';

export async function fetchList() {
  return apiGet('/items');
}
