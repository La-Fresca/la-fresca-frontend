import { User } from '@/types/user';
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

export const useUsers = () => {
  const getAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/user/allusers`, {
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

  const addUser = async (data: User) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
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

  const updateUser = async (data: User) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update User');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/user/specificuserbyid/${id}`, {
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

  return {
    getAllUsers,
    addUser,
    updateUser,
    getUserById,
  };
};
