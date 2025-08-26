import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppTheme } from '../constants/theme';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
    theme: typeof AppTheme;
    colors: typeof AppTheme.colors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [isDark, setIsDark] = useState(false);

    // Load saved theme preference
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme) {
                    const isDarkMode = savedTheme === 'dark';
                    setIsDark(isDarkMode);
                    setColorScheme(isDarkMode ? 'dark' : 'light');
                }
            } catch (error) {
                console.error('Error loading theme:', error);
            }
        };

        loadTheme();
    }, [setColorScheme]);

    const toggleTheme = async () => {
        try {
            const newIsDark = !isDark;
            setIsDark(newIsDark);
            setColorScheme(newIsDark ? 'dark' : 'light');
            await AsyncStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    // Extend your existing theme with dark mode variants
    const extendedTheme = {
        ...AppTheme,
        colors: {
            ...AppTheme.colors,
            // Add dark mode colors
            background: {
                light: '#ffffff',
                dark: '#111827',
                50: isDark ? '#111827' : '#f9fafb',
                100: isDark ? '#1f2937' : '#f3f4f6',
            },
            text: {
                primary: isDark ? '#f9fafb' : '#111827',
                secondary: isDark ? '#d1d5db' : '#6b7280',
                muted: isDark ? '#9ca3af' : '#6b7280',
            },
            card: {
                background: isDark ? '#1f2937' : '#ffffff',
                border: isDark ? '#374151' : '#e5e7eb',
            }
        }
    };

    const value: ThemeContextType = {
        isDark,
        toggleTheme,
        theme: extendedTheme,
        colors: extendedTheme.colors,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};