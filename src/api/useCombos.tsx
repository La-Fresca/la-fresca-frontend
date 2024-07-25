import Cookies from 'js-cookie';
const API_URL = (import.meta as any).env.VITE_API_URL;
import { FoodCombo } from '@/types/combo';

function getToken() {
  try {
    return Cookies.get('_auth');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useCombos = () => {
  const getAllCombos = async () => {
    try {
      const response = await fetch(`${API_URL}/foodCombo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
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

  const addCombo = async (data: FoodCombo) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getComboById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
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

  const updateCombo = async (id: string, data: FoodCombo) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const deleteCombo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          deleted: 1,
          price: 0,
          image: '',
          available: 0,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete food combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  return { getAllCombos, addCombo, getComboById, updateCombo, deleteCombo };
};
