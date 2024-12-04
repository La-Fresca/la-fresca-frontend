import React, { useEffect, useState } from 'react';
import OrderCard from '@/pages/DeliveryPerson/OrderCard';
import { useOrders } from '@/api/useOrder';
import { useUsers } from '@/api/useUser';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Order } from '@/types/order';
import { User } from '@/types/user';

const History = () => {
  const userId = (useAuthUser() as { userId: string }).userId;
  const { getCompletedOrdersByDeliveryPersonId } = useOrders();
  const { getUserById } = useUsers();
  const [ordersWithUsers, setOrdersWithUsers] = useState<
    { order: Order; user: User | undefined }[]
  >([]);

  // Fetch orders and user details
  const fetchOrdersWithUsers = async () => {
    try {
      // Fetch orders
      const orders = await getCompletedOrdersByDeliveryPersonId(userId);

      // Fetch user data for each order
      const userPromises = orders.map(async (order: { customerId: string; }) => {
        const user = await getUserById(order.customerId);
        console.log("user ", user)
        return { order, user };
      });

      // Wait for all user data to be fetched
      const ordersWithUserData = await Promise.all(userPromises);

      // Update state with combined data
      setOrdersWithUsers(ordersWithUserData);
    } catch (error) {
      console.error('Error fetching orders or users:', error);
    }
  };

  function formatOrderId(orderId: string|any): string {
    return `Order #${orderId.slice(0, 6).toUpperCase()}${orderId.slice(-4).toUpperCase()}`;
  }

  useEffect(() => {
    fetchOrdersWithUsers();
  }, []);

  const buttonFunction = async () =>  {
    console.log("Clicked")
  }

  return (
    <div className="mx-10 my-5 flex flex-col gap-5">
      <div className="relative">
        <p className="text-xl font-bold text-white">Delivery History</p>
      </div>

      <div className="flex flex-col h-[70%] overflow-auto gap-2">
        {ordersWithUsers.map(({ order, user }, index) => (
          <OrderCard
          key={index}
          title={
            user
              ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
              : 'Unknown User'
          }
          subtitle={formatOrderId(order.id)}
          cardImage={
            
            order.orderItems[0].image // Fallback image or data
          }
          buttonTitle="View order"
          text={`Completed at ${order.updatedAt}`} 
          onButtonClick={buttonFunction}
        />
        
        ))}
      </div>
    </div>
  );
};

export default History;
