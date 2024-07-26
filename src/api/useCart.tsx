import { Cart, CartItem, CustomFeature } from '@/types/cart';
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

export const useCart = () => {
  const getCartByUserId = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const addCartItem = async (data: Cart) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add cart item');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return { getCartByUserId, addCartItem };
};
