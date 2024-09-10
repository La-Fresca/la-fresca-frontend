import Cookies from 'js-cookie';
const API_URL = (import.meta as any).env.VITE_API_URL;
import { Inventory } from '@/types/inventory';

function getToken() {
  try {
    return Cookies.get('_auth');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useInventory = () => {
  const getAllInventory = async () => {
    try {
      const response = await fetch(`${API_URL}/stockCollection/cafe 1`, {
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

  const addInventory = async (data: Inventory) => {
    try {
      const response = await fetch(`${API_URL}/stockCollection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add stock');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getInventoryById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/stockCollection/${id}`, {
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

  const updateInventory = async (id: string, data: Inventory) => {
    try {
      const response = await fetch(`${API_URL}/stockCollection/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update stock');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const deleteInventory = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/stockCollection/delete/${id}`, {
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
        throw new Error('Failed to delete stock');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const unsafeDeleteInventory = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/stockCollection/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete stock');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getAllInventory,
    addInventory,
    getInventoryById,
    updateInventory,
    deleteInventory,
    unsafeDeleteInventory,
  };
};
