import { Discount } from '@/types/discount';
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

export const useDiscount = () => {
  const getAllDiscounts = async () => {
    try {
      const response = await fetch(`${API_URL}/discount/cafe 1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch discount');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const addDiscount = async (data: Discount) => {
    try {
      const response = await fetch(`${API_URL}/discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add disocunt');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const updateDiscount = async (id: string, data: Discount) => {
    try {
      const response = await fetch(`${API_URL}/discount/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update discount');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getDiscountByMenuItemId = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/discount/view/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch discount');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const deleteDiscount = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/discount/delete/${id}`, {
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
        throw new Error('Failed to delete discount');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    addDiscount,
    getAllDiscounts,
    getDiscountByMenuItemId,
    updateDiscount,
    deleteDiscount
  };
};
