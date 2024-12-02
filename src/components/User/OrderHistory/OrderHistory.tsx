import React, { useState } from 'react';
import { OrderCard } from './OrderCard';
import { OrderDetails } from './OrderDetails';
import { useOrders } from '@/api/useOrder';
import { useQuery } from '@tanstack/react-query';

const steps = ['Order Confirmed', 'Cooking', 'Delivering', 'Delivered'];

// Helper function to get completion times based on order status and created date
const getCompletionTimes = (createdAt: string, status: string) => {
  const baseTime = new Date(createdAt);
  const times = [];

  // Add confirmation time
  times.push(
    baseTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  );

  // Add subsequent times based on status
  for (let i = 1; i < steps.length; i++) {
    if (
      (status === 'PENDING' && i === 0) ||
      (status === 'PREPARING' && i <= 1) ||
      (status === 'DELIVERING' && i <= 2) ||
      (status === 'COMPLETED' && i <= 3)
    ) {
      const nextTime = new Date(baseTime);
      nextTime.setMinutes(baseTime.getMinutes() + 30 * i);
      times.push(
        nextTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      );
    } else {
      times.push('');
    }
  }
  return times;
};

export const OrderHistory = () => {
  const { getOrdersByUserId } = useOrders();
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);

  const orderQuery = useQuery({
    queryKey: ['orders', 'userId'],
    queryFn: getOrdersByUserId,
  });

  if (orderQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!orderQuery.data || orderQuery.data.length === 0) {
    return <div>No orders found</div>;
  }

  const orders = orderQuery.data;

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 1;
      case 'PREPARING':
        return 2;
      case 'DELIVERING':
        return 3;
      case 'COMPLETED':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <>
      <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Order History</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Keep track of all past orders effortlessly, making reordering favorites
        quick and simple.
      </div>
      <div className="flex flex-col-reverse lg:flex-row w-full lg:w-screen px-4 lg:px-10 mt-10">
        <div className="w-full lg:w-[40%] flex flex-col space-y-4 mx-2 lg:mx-10 mb-4 lg:mb-0">
          {orders.map((order, index) => {
            const stageIndex = getStageIndex(order.orderStatus);
            const completionTimesArray = getCompletionTimes(
              order.createdAt,
              order.orderStatus,
            );

            return (
              <div onClick={() => setSelectedOrderIndex(index)} key={order.id}>
                <OrderCard
                  order={{
                    order: {
                      orderId: order.id,
                      orderDate: order.createdAt,
                      orderStatus: order.orderStatus,
                      orderItems: order.orderItems,
                      orderSummary: {
                        subtotal: order.totalAmount,
                        shipping: 0,
                        discount: order.discount,
                        total: order.totalAmount - order.discount,
                      },
                      delivery: {
                        address: order.location,
                      },
                    },
                    completionTimesArray,
                    stageIndex,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="hidden lg:block w-full lg:w-[60%] flex flex-col mx-2 lg:mx-10 mt-4 lg:mt-0">
          <OrderDetails order={orders[selectedOrderIndex]} />
        </div>
      </div>
    </>
  );
};
