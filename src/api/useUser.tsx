import { User } from '@/types/user';
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

  const getAllBranchManagers = async () => {
    try {
      const response = await fetch(`${API_URL}/user/availableBranchManagers`, {
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
        body: JSON.stringify({
          ...data,
          cafeId: data.cafeId === null ? null : getCafeId(), // Only get cafeId if not explicitly set to null
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
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
        body: JSON.stringify({
          ...data,
          cafeId: getCafeId(),
        }),
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

  const getWaiterById = async () => {
    try {
      const response = await fetch(
        `${API_URL}/user/getWaiters/${getCafeId()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch waiters');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getDeliveryPersonById = async () => {
    try {
      const response = await fetch(
        `${API_URL}/user/getDeliveryPersons/${getCafeId()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch delivery persons');
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
    getWaiterById,
    getDeliveryPersonById,
    getAllBranchManagers,
  };
};
