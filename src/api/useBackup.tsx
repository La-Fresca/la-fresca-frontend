import Cookies from 'js-cookie';

const API_URL = (import.meta as any).env.VITE_BACKUP_API_URL;

function getToken() {
  try {
    return Cookies.get('_auth');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export type BackupInterval = 'daily' | 'weekly' | 'monthly';

export interface BackupInfo {
  name: string;
  size: number;
  modified: string;
}

export const useBackup = () => {
  const scheduleBackup = async (interval: BackupInterval) => {
    try {
      const response = await fetch(`${API_URL}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ interval }),
      });
      if (!response.ok) {
        throw new Error('Failed to schedule backup');
      }
      return response.text();
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const listBackups = async (): Promise<BackupInfo[]> => {
    try {
      const response = await fetch(`${API_URL}/backups`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch backups');
      }
      return response.json();
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const createBackup = async () => {
    try {
      const response = await fetch(`${API_URL}/backup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to create backup');
      }
      return response.text();
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const restoreBackup = async (backupName: string) => {
    try {
      const response = await fetch(`${API_URL}/restore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ backupName }),
      });
      if (!response.ok) {
        throw new Error('Failed to restore backup');
      }
      return response.text();
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    scheduleBackup,
    listBackups,
    createBackup,
    restoreBackup,
  };
};
