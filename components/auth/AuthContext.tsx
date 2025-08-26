import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { z } from 'zod';

// Zod schemas for validation
const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const SignupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/\d/, 'Password must contain a number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain special character'),
  confirmPassword: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  birthdate: z.string().min(1, 'Birthdate is required'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Types
type LoginData = z.infer<typeof LoginSchema>;
type SignupData = z.infer<typeof SignupSchema>;
type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
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
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('user_data');
      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate input
      const validatedData = LoginSchema.parse(data);
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Mock successful login
      const mockUser: User = {
        id: 'user_123',
        email: validatedData.email,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        createdAt: new Date().toISOString(),
      };
      // Store auth data
      await AsyncStorage.setItem('auth_token', 'mock_token_123');
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      router.replace('/(tabs)');
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Use issues property for ZodError
        return { success: false, error: error.issues[0]?.message || 'Validation error' };
      }
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate input
      const validatedData = SignupSchema.parse(data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Mock successful signup
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        createdAt: new Date().toISOString(),
      };
      // Store auth data
      await AsyncStorage.setItem('auth_token', 'mock_token_' + Math.random());
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      router.replace('/(tabs)');
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Use issues property for ZodError
        return { success: false, error: error.issues[0]?.message || 'Validation error' };
      }
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  const resetPassword = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate input
      ResetPasswordSchema.parse({ email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Use issues property for ZodError
        return { success: false, error: error.issues[0]?.message || 'Validation error' };
      }
      return { success: false, error: 'Password reset failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    signup,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
