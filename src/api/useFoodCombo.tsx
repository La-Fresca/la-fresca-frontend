import { FoodCombo } from '@/types/combo';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const API_URL = (import.meta as any).env.VITE_API_URL;

function getToken() {
  try {
    return Cookies.get('_auth');
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getCafeId() {
  const accessToken = getToken();
  const cafeId = jwtDecode(accessToken).cafeId;
  return cafeId;
}

export const useCombos = () => {
  const getAllCombos = async () => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/getAll/${getCafeId}`, {
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

  const getAllCombosForTLM = async () => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/getAllForTLM`, {
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
        body: JSON.stringify({
          ...data,
          cafeId: getCafeId(),
        }),
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
        body: JSON.stringify({
          ...data,
          cafeId: getCafeId(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const approveCombo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/approve/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to approve food combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const rejectCombo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/reject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to reject food combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const deleteCombo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/delete/${id}`, {
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
        throw new Error('Failed to delete food combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const unsafeDeleteCombo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/foodCombo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete food combo');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getAllCombos,
    addCombo,
    getComboById,
    updateCombo,
    deleteCombo,
    unsafeDeleteCombo,
    getAllCombosForTLM,
    approveCombo,
    rejectCombo,
  };
};
