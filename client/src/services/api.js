// Local: Vite proxy → /api. Hosted same-origin: /api. Split hosting: set VITE_API_URL.
const API_BASE = import.meta.env.VITE_API_URL || '/api';
const AUTH_KEY = 'ceyloncart-user';

function getAuthHeaders() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return {};
    const user = JSON.parse(raw);
    return {
      'X-User-Id': user.id || '',
      'X-User-Role': user.role || '',
    };
  } catch {
    return {};
  }
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed: ${response.status}`);
  }
  return data;
}

export async function apiGet(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });
  return handleResponse(response);
}

export async function apiPost(path, body, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse(response);
}

export async function apiDelete(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(), ...options.headers },
    ...options,
  });
  if (response.status === 204) return null;
  return handleResponse(response);
}
