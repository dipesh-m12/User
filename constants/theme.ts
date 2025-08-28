export const AppTheme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    blue: {
       50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe', 
      300: '#93c5fd', // ✅ Light blue for subtle elements
      400: '#60a5fa', // ✅ Medium-light blue
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    purple:{
      50: '#f5f0ff',
      100: '#e9d5ff',
      200: '#d8b4fe',
      300: '#c084fc',
      400: '#a855f7',
      500: '#9333ea',
      600: '#7e22ce',
      700: '#6b21a8',
      800: '#581c87',
      900: '#3b0e5b',
    },
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    text: {
      primary: '#1e3a8a',     // Dark blue for headings
      secondary: '#3b82f6',   // Medium blue for body text
      subtle: '#60a5fa',      // Light blue for subtle text
      muted: '#93c5fd',  
      dark : {
        primary: "#ffffff", // White for dark mode headings
        secondary: "#e2e8f0", // Light gray for body text
        subtle: "#94a3b8", // Medium gray for subtle text
        muted: "#64748b", // Darker gray for muted text
      }     // Very light blue for muted text
    },
    icon: {
      primary: '#2563eb',     // Main icons
      secondary: '#3b82f6',   // Secondary icons
      subtle: '#60a5fa',      // Subtle icons
      light: '#93c5fd',       // Light state icons
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    dark: {
      background: "#0f172a", // Main dark background
      surface: "#1e293b", // Card/surface background
      surfaceLight: "#334155", // Lighter surface for contrast
      border: "#475569", // Border color
      accent: "#60a5fa", // Accent color that works on dark
    },
    success: {
  50:  '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
},
warning: {
  50:  '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
},
error: {
  50:  '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
},

  },
gradients: {
    primary: ['#2563eb', '#1e40af'] as const,  // QVuew icon and buttons
    background: ['#f0f9ff', '#e0f2fe'] as const,
    darkBackground: ["#0f172a", "#1e293b"] as const,
    darkSurface: ["#1e293b", "#334155"] as const,
    light: ['#dbeafe', '#bfdbfe'] as const,
    dark: ['#1e3a8a', '#1e40af'] as const,
    button: ['#3b82f6', '#1d4ed8'] as const,   // login button if needed
    darkButton: ["#60a5fa", "#3b82f6"] as const,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 8,
    },
    darkSm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    darkMd: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
};