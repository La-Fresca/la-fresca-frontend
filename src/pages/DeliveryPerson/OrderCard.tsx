import React from 'react';
import OrderCard from '@/pages/DeliveryPerson/OrderCard';
import { useDelivery } from '@/api/useDelivery';
import { useQuery } from '@tanstack/react-query';

const OrderQueue = () => {
  const { getOrders, changestatus } = useDelivery();

  // Fetch orders using react-query
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: () => getOrders(),
  });

  // Function to format order ID for display
  function formatOrderId(orderId: string | any): string {
    return `Order #${orderId.slice(0, 6).toUpperCase()}${orderId.slice(-4).toUpperCase()}`;
  }

  // Button click handler to change status
  const buttonFunction = async (orderId: string) => {
    try {
      console.log(`Changing status for order: ${orderId}`);
      const newStatus = "DELIVERED"; // Status change
      const data = {
        id: orderId,
        orderStatus: newStatus // Send the status as string
      };

      // Call API to change status
      await changestatus(data);

      console.log('Status updated successfully!');

      // After status change, refetch orders to update the UI
      refetch(); // Re-fetch orders after status change

    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="mx-10 my-5 flex flex-col gap-5">
      <div className="relative">
        <p className="text-xl font-bold text-white">Delivery Orders Queue</p>
      </div>

      <div className="flex flex-col h-[70%] overflow-auto gap-2">
        {isLoading ? (
          <p className="text-white">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-white">No pending orders</p>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              title={formatOrderId(order.id)}
              orderId={order.id}
              subtitle={order.location}
              cardImage={order.orderItems[0]?.image || 'default-image-url'}
              buttonTitle="Pick Order"
              text={`Created: ${order.createdAt}`}
              onButtonClick={buttonFunction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderQueue;
