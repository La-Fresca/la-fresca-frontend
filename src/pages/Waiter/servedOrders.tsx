import React, { useState } from 'react';
import Card from '@components/Waiter/ServedOrders/Card2';
import Modal from '@components/Waiter/Dashboard/modal';
import WaiterTop from '@/components/Waiter/Dashboard/waiterTop';
import { useQuery } from '@tanstack/react-query';
import { useOrders } from '@/api/useOrder';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ServedOrders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { getServedToWaiterOrders } = useOrders();

  // Get cafeId from token
  const getCafeId = () => {
    const token = Cookies.get('_auth');
    return token ? jwtDecode<any>(token).cafeId : null;
  };

  // Add React Query hook for served orders
  const { data: servedOrders = [], isLoading } = useQuery({
    queryKey: ['servedOrders'],
    queryFn: () => getServedToWaiterOrders(getCafeId()),
  });

  const handleMoreDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white flex">
      <div className="flex-1 p-4">
        {/* <WaiterTop /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {servedOrders.map((order) => (
            <Card
              key={order.id}
              id={order.id}
              waiterId={order.waiterId}
              order={order.id}
              orderType={order.orderType}
              totalAmount={order.totalAmount}
              orderItems={order.orderItems}
              orderStatus={order.orderStatus}
              createdAt={order.createdAt}
              onMoreDetails={handleMoreDetails}
              isServed={true}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ServedOrders;
