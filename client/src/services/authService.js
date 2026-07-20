import { apiPost } from './api';

export async function login(email, password) {
  const data = await apiPost('/auth/login', { email, password });
  return data.user;
}

export async function register(name, email, password) {
  const data = await apiPost('/auth/register', { name, email, password });
  return data.user;
}
