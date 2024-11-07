import { Branch } from '@/types/branch';
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

export const useBranches = () => {
  const getAllBranches = async () => {
    try {
      const response = await fetch(`${API_URL}/branch`, {
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

  const getAvailableBranchManagers = async () => {
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
  
  const addBranch = async (data: Branch) => {
    try {
      const response = await fetch(`${API_URL}/branch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add branch');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const updateBranch = async (id: string, data: Branch) => {
    try {
      const response = await fetch(`${API_URL}/branch/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update branch');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getBranchById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/branch/${id}`, {
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

  const deleteBranch = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/branch/delete/${id}`, {
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
        throw new Error('Failed to delete branch');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getAllBranches,
    addBranch,
    updateBranch,
    getBranchById,
    deleteBranch,
    getAvailableBranchManagers
  };
};
