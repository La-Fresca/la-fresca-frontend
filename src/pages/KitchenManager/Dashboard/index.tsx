import React from 'react';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Order } from '@/types/order';
import { useOrders } from '@/api/useOrders';
import timeAgo from '@/util/TimesAgo';

const Dashboard: React.FC = () => {
  const { getAllOrders } = useOrders();
  const orderQuery = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  if (orderQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (orderQuery.isError) {
    return <div>Error: {JSON.stringify(orderQuery.error)}</div>;
  }

  const orders: Order[] = orderQuery.data;

  const filterdOrders = orders.slice(0, 10);
  console.log(orders);

  const colours = [
    'red',
    'green',
    'blue',
    'yellow',
    'white',
    'purple',
    'orange',
    'pink',
    'brown',
    'grey',
  ];

  const getFilteredOrders = (status: string) => {
    return filterdOrders
      .map((order) => ({
        ...order,
        orderItems: order.orderItems.filter(
          (item) => item.orderStatus === status,
        ),
      }))
      .filter((order) => order.orderItems.length > 0);
  };

  const itemWaitingQueue = getFilteredOrders('PENDING');
  const itemPendingQueue = getFilteredOrders('PREPARING');
  const itemCompletedQueue = getFilteredOrders('READY');

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5">
      <div
        className="h-[80vh] xl:w-[24vw] bg-white rounded-xl dark:bg-gray"
        style={{
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <p className="font-bold dark:text-white text-foodbg text-2xl pt-5 text-center">
          Pending Orders
        </p>
        <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
          {itemWaitingQueue.map((order) => {
            const originalOrderIndex = orders.findIndex(
              (o) => o.id === order.id,
            );
            return (
              <div
                key={order.id}
                className={`rounded-2xl px-2 py-2 mt-5 border-4`}
                style={{ borderColor: `${colours[originalOrderIndex]}` }}
              >
                <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                  Order ID: {order.id.slice(-6).toUpperCase()}
                </p>
                <p className="text-center text-xs">
                  <b
                    className={`dark:text-white border border-xl border-foodbg rounded-xl px-2 ${
                      order.orderType === 'ONLINE'
                        ? 'bg-[#5713b8]'
                        : 'bg-red-500'
                    }`}
                  >
                    {order.orderType}
                  </b>
                  | {timeAgo(order.createdAt)}
                </p>
                {order.orderItems.map((item) => (
                  <div
                    key={item.foodId}
                    className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5"
                  >
                    <img src={item.image} className="w-11 h-11" />
                    <div className="w-[110px] h-[60px]">
                      <p className="text-md">{item.name}</p>
                      <p className="text-xs">x{item.quantity}</p>
                    </div>
                    <div className="grid w-[100px]">
                      <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                        Next
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="h-[80vh] xl:w-[24vw] bg-white rounded-xl dark:bg-gray"
        style={{
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <p className="font-bold dark:text-white text-foodbg text-2xl pt-5 text-center">
          Preparing Orders
        </p>
        <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
          {itemPendingQueue.map((order) => {
            const originalOrderIndex = orders.findIndex(
              (o) => o.id === order.id,
            );
            return (
              <div
                key={order.id}
                className={`rounded-2xl px-2 py-2 mt-5 border-4`}
                style={{ borderColor: `${colours[originalOrderIndex]}` }}
              >
                <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                  Order ID: {order.id.slice(-6).toUpperCase()}
                </p>
                <p className="text-center text-xs">
                  <b
                    className={`dark:text-white border border-xl border-foodbg rounded-xl px-2 ${
                      order.orderType === 'ONLINE'
                        ? 'bg-[#5713b8]'
                        : 'bg-red-500'
                    }`}
                  >
                    {order.orderType}
                  </b>
                  | {timeAgo(order.createdAt)}
                </p>
                {order.orderItems.map((item) => (
                  <div
                    key={item.foodId}
                    className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5"
                  >
                    <img src={item.image} className="w-11 h-11" />
                    <div className="w-[110px] h-[60px]">
                      <p className="text-md">{item.name}</p>
                      <p className="text-xs">x{item.quantity}</p>
                    </div>
                    <div className="grid w-[100px]">
                      <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                        Next
                      </Button>
                      <Button className="bg-gradient-to-r from-gray-600 to-gray-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                        Back
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="h-[80vh] xl:w-[24vw] bg-white rounded-xl dark:bg-gray"
        style={{
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <p className="font-bold dark:text-white text-foodbg text-2xl pt-5 text-center">
          Ready Orders
        </p>
        <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
          {itemCompletedQueue.map((order) => {
            const originalOrderIndex = orders.findIndex(
              (o) => o.id === order.id,
            );
            return (
              <div
                key={order.id}
                className={`rounded-2xl px-2 py-2 mt-5 border-4`}
                style={{ borderColor: `${colours[originalOrderIndex]}` }}
              >
                <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                  Order ID: {order.id.slice(-6).toUpperCase()}
                </p>
                <p className="text-center text-xs">
                  <b
                    className={`dark:text-white border border-xl border-foodbg rounded-xl px-2 ${
                      order.orderType === 'ONLINE'
                        ? 'bg-[#5713b8]'
                        : 'bg-red-500'
                    }`}
                  >
                    {order.orderType}
                  </b>
                  | {timeAgo(order.createdAt)}
                </p>
                {order.orderItems.map((item) => (
                  <div
                    key={item.foodId}
                    className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5"
                  >
                    <img src={item.image} className="w-11 h-11" />
                    <div className="w-[110px] h-[60px]">
                      <p className="text-md">{item.name}</p>
                      <p className="text-xs">x{item.quantity}</p>
                    </div>
                    <div className="grid w-[100px]">
                      <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                        Next
                      </Button>
                      <Button className="bg-gradient-to-r from-gray-600 to-gray-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                        Back
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
