import { Order, OrderItemStatus } from '@/types/order';
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

export const useOrders = () => {
  const getAllOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/order`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const createOrder = async (data: Order) => {
    try {
      const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add order');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getOrderById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/order/specificorderbyid/${id}`, {
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

  const updateOrder = async (data: Order) => {
    try {
      const response = await fetch(`${API_URL}/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/order/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          deleted: 1,
          available: 0,
          discountStatus: 0,
          rating: 0,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const getPendingOrdersByDeliveryPersonId = async (id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/order/pendingordersbydeliverypersonid/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getCompletedOrdersByDeliveryPersonId = async (id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/order/completedordersbydeliverypersonid/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };


  const updateOrderItemStatus = async (data: OrderItemStatus) => {
    try {
      const response = await fetch(`${API_URL}/order/updateOrderItemStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update order item status');
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getPendingOrdersByDeliveryPersonId,
    getCompletedOrdersByDeliveryPersonId,
    updateOrderItemStatus,
  };
};
