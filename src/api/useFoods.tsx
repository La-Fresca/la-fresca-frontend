import { Food } from '@/types/food';
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

export const useFoods = () => {
  const getAllFoods = async () => {
    try {
      const response = await fetch(`${API_URL}/foodItem/getAll/cafe 1`, {
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

  const addFood = async (data: Food) => {
    try {
      const response = await fetch(`${API_URL}/foodItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
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

  const getFoodById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodItem/${id}`, {
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

  const updateFood = async (id: string, data: Food) => {
    try {
      const response = await fetch(`${API_URL}/foodItem/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update food');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const deleteFood = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodItem/delete/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          deleted: 1,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete food');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  return { getAllFoods, addFood, getFoodById, updateFood, deleteFood };
};
