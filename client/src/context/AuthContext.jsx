import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginApi, register as registerApi } from '../services/authService';

const AUTH_KEY = 'ceyloncart-user';
const AuthContext = createContext(null);

function loadUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const login = useCallback(async (email, password) => {
    const loggedIn = await loginApi(email, password);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const registered = await registerApi(name, email, password);
    setUser(registered);
    return registered;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
    }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default AuthContext;
