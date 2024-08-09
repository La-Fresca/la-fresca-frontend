import Cookies from 'js-cookie';
const API_URL = (import.meta as any).env.VITE_API_URL;
import { Stock } from '@/types/stock';

function getToken() {
  try {
    return Cookies.get('_auth');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useStocks = () => {
  const getAllStocks = async () => {
    try {
      const response = await fetch(`${API_URL}/stock`, {
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

  const addStock = async (data: Stock) => {
    try {
      const response = await fetch(`${API_URL}/stock`, {
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

  const getStockById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/stock/${id}`, {
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

  const updateStock = async (id: string, data: Stock) => {
    try {
      const response = await fetch(`${API_URL}/stock/${id}`, {
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

  const deleteStock = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/stock/delete/${id}`, {
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

  const unsafeDeleteStock = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/stock/${id}`, {
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

  const getStockyByCollection = async (collectionName: string) => {
    try {
      const response = await fetch(
        `${API_URL}/stock/collection/${collectionName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
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

  return {
    getAllStocks,
    addStock,
    getStockById,
    updateStock,
    deleteStock,
    unsafeDeleteStock,
    getStockyByCollection,
  };
};
