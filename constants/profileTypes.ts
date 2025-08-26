// constants/profileTypes.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface SettingsState {
  pushNotifications: boolean;
  darkMode: boolean;
  language: string;
}

export const mockUser: User = {
  id: '1',
  name: 'Krishna Agrawal',
  email: '9322975992@qvuew.temp',
  phone: '+91 93229 75992'
};

export const mockSettings: SettingsState = {
  pushNotifications: true,
  darkMode: false,
  language: 'English (US)'
};
