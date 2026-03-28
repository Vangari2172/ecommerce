import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ocean-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email, password) => {
    // Mock login
    const mockUser = { id: 1, name: 'John Doe', email, initials: 'JD' };
    setUser(mockUser);
    localStorage.setItem('ocean-user', JSON.stringify(mockUser));
    return true;
  }, []);

  const signup = useCallback((name, email, password) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const mockUser = { id: 1, name, email, initials };
    setUser(mockUser);
    localStorage.setItem('ocean-user', JSON.stringify(mockUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ocean-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
