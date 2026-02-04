export interface Sound {
  id: string;
  filename: string;
  title: string;
  category: SoundCategory;
  description: string;
  duration?: string; // e.g. "0:05"
}

export enum SoundCategory {
  UI = 'UI Effects',
  AMBIENCE = 'Ambience',
  NOTIFICATION = 'Notifications',
  GAME = 'Game FX',
  MISC = 'Miscellaneous',
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
