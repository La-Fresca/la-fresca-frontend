import Cookies from 'js-cookie';
const API_URL = (import.meta as any).env.VITE_API_URL;
import { Complaint } from '@/types/complaint';
import { jwtDecode } from 'jwt-decode';

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

export const useComplaint = () => {
  const getAllComplaints = async () => {
    try {
      const cafeId = getCafeId();
      const response = await fetch(`${API_URL}/complaint/findComplainByComplainee/${cafeId}`, {
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

  const getAllComplaintsForTLM = async () => {
    try {
      const response = await fetch(`${API_URL}/complaint`, {
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

  const addComplaint = async (data: Complaint) => {
    try {
      const response = await fetch(`${API_URL}/complaint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...data, cafeId: getCafeId() }),
      });
      if (!response.ok) {
        throw new Error('Failed to add complaint');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getComplaintById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/complaint/${id}`, {
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

  const deleteComplaint = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/complaint/${id}`, {
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
        throw new Error('Failed to delete complaint');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  return {
    getAllComplaints,
    addComplaint,
    getComplaintById,
    deleteComplaint,
    getAllComplaintsForTLM,
  };
};
