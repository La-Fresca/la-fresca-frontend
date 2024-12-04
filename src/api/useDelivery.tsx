import { OrderStatus } from '@/types/order';
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

function getUserId() {
  const accessToken = getToken();
  const userId = jwtDecode(accessToken).userId;
  return userId;
}

export const useDelivery = () => {
  const getOrders = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(
        `${API_URL}/order/pendingordersbydeliverypersonid/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch delivery orders');
      }
      return response.json();
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const changestatus = async (data: OrderStatus) => {
    try {
      const response = await fetch(`${API_URL}/order/changestatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          ...data,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to change order status');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const Dashboard = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(
        `${API_URL}/order/deliveryPersonDashboard/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch delivery orders');
      }
      return response.json();
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getOrders,
    changestatus,
    Dashboard
  };
};
