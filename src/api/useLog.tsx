import { Log } from '@/types/logs';
import Cookies from 'js-cookie';

const API_URL = (import.meta as any).env.VITE_API_URL;

function getToken() {
  try {
    return Cookies.get('_auth');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useLogs = () => {
  const getAllReadableLogs = async () => {
    try {
      const response = await fetch(`${API_URL}/systemLog/readablelogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return { getAllReadableLogs };
};
