import { Order, OrderItemStatus, OrderStatus } from '@/types/order';
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

function getUserId() {
  const accessToken = getToken();
  const userId = jwtDecode(accessToken).userId;
  return userId;
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
        body: JSON.stringify({
          ...data,
          cafeId: getCafeId(),
        }),
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
        const data = await response.json(); // Await the resolved JSON data
        console.log('Result:', data); // Log the data after resolving
        return data;
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

  const getOrdersByUserId = async () => {
    try {
      const response = await fetch(
        `${API_URL}/order/specificorderbycustomerid/${getUserId()}`,
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

  const getAssignedToWaiterOrders = async (cafeId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/order/getAssignedToWaiterOrders/${cafeId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch waiter orders');
      } else {
        return response.json();
      }
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

  return {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getPendingOrdersByDeliveryPersonId,
    getCompletedOrdersByDeliveryPersonId,
    updateOrderItemStatus,
    getOrdersByUserId,
    getAssignedToWaiterOrders,
    changestatus,
  };
};
