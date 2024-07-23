import { Food } from '@/types/food';
import Cookies from 'js-cookie';

const API_URL = (import.meta as any).env.VITE_API_URL;
const TOKEN = Cookies.get('_auth');

export const useFoods = () => {
  const getAllFoods = async () => {
    try {
      const response = await fetch(`${API_URL}/food`, {
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

  const addFood = async (data: Food) => {
    try {
      const response = await fetch(`${API_URL}/food`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add food');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return { getAllFoods, addFood };
};
