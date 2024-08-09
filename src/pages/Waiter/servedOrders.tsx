import React, { useState, useEffect } from 'react';
import Card from '@components/Waiter/ServedOrders/Card2';
import Modal from '@components/Waiter/Dashboard/modal';
import WaiterTop from '@/components/Waiter/Dashboard/waiterTop';

const initialServedOrders = [
  { id: 1, waiter: 'Waiter 01', order: '#01011', customer: 'John Doe', color: 'yellow-500' },
  { id: 3, waiter: 'Waiter 02', order: '#02100', customer: 'John perera', color: 'violet-900' },
  { id: 5, waiter: 'Waiter 03', order: '#01111', customer: 'dasun thathsara', color: 'red-500' },
  { id: 8, waiter: 'Waiter 04', order: '#01311', customer: 'udantha Indusara', color: 'blue-500' },
];

const ServedOrders: React.FC = () => {    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [servedOrders, setServedOrders] = useState(initialServedOrders);

  useEffect(() => {
    // Load served orders from a shared state or API
    // setServedOrders(loadedOrders);
  }, []);

  const handleMoreDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen text-white flex">
      <div className="flex-1 p-4">
        <WaiterTop />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {servedOrders.map((order) => (
            <Card key={order.id} {...order} onMoreDetails={handleMoreDetails} />
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
