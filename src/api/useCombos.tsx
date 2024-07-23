import Cookies from 'js-cookie';

const API_URL = (import.meta as any).env.VITE_API_URL;
const TOKEN = Cookies.get('_auth');

export const useCombos = () => {
  const getAllCombos = async () => {
    try {
      const response = await fetch(`${API_URL}/foodCombo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch item');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return { getAllCombos };
};
