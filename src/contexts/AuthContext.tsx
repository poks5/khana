import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, otp: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isOfflineMode: boolean;
  switchToOfflineMode: () => void;
  switchToOnlineMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log('AuthProvider rendering...');
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(true);

  useEffect(() => {
    console.log('AuthProvider useEffect running...');
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const savedMode = localStorage.getItem('appMode');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsOfflineMode(savedMode !== 'online');
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      
      setUser(mockUser);
      setIsOfflineMode(false);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('appMode', 'online');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        phone,
        name: `User ${phone.slice(-4)}`
      };
      
      setUser(mockUser);
      setIsOfflineMode(false);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('appMode', 'online');
    } catch (error) {
      console.error('Phone login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        name
      };
      
      setUser(mockUser);
      setIsOfflineMode(false);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('appMode', 'online');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsOfflineMode(true);
    localStorage.removeItem('user');
    localStorage.setItem('appMode', 'offline');
  };

  const switchToOfflineMode = () => {
    setIsOfflineMode(true);
    localStorage.setItem('appMode', 'offline');
  };

  const switchToOnlineMode = () => {
    if (user) {
      setIsOfflineMode(false);
      localStorage.setItem('appMode', 'online');
    }
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithPhone,
    signup,
    logout,
    isLoading,
    isOfflineMode,
    switchToOfflineMode,
    switchToOnlineMode
  };

  console.log('AuthProvider rendering with value:', { user: user?.name, isOfflineMode, isLoading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
