import React from 'react';
import OrderCard from '@/pages/DeliveryPerson/OrderCard';
import { useDelivery } from '@/api/useDelivery';
import { useQuery } from '@tanstack/react-query';

const OrderQueue = () => {
  const { getOrders } = useDelivery();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: () => getOrders(),
  });

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
              title={`#${order.id.substring(0, 5)}`}
              subtitle={order.location}
              cardImage={order.orderItems[0]?.image || 'default-image-url'}
              buttonTitle="Pick Order"
              text={`Created: ${order.createdAt}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderQueue;
