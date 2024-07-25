import React, { useState } from 'react';
import Card from '@components/Waiter/Dashboard/card';
import Modal from '@components/Waiter/Dashboard/modal';
import WaiterTop from '@/components/Waiter/Dashboard/waiterTop';

const orders = [
  { id: 1, waiter: 'Waiter 01', order: '#01011', customer: 'John Doe', color: 'yellow-500' },
  { id: 2, waiter: 'Waiter 03', order: '#01011', customer: 'John Doe', color: 'red-500' },
  { id: 3, waiter: 'Waiter 02', order: '#01011', customer: 'John Doe', color: 'violet-900' },
  { id: 4, waiter: 'Waiter 04', order: '#01011', customer: 'John Doe', color: 'blue-500' },
  { id: 5, waiter: 'Waiter 03', order: '#01011', customer: 'John Doe', color: 'red-500' },
  { id: 6, waiter: 'Waiter 02', order: '#01011', customer: 'John Doe', color: 'violet-900' },
  { id: 7, waiter: 'Waiter 01', order: '#01011', customer: 'John Doe', color: 'yellow-500' },
  { id: 8, waiter: 'Waiter 04', order: '#01011', customer: 'John Doe', color: 'blue-500' },
];

const WaiterDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
          {orders.map(order => (
            <Card key={order.id} {...order} onMoreDetails={handleMoreDetails} />
          ))}
        </div>
      </div>
      {isModalOpen && <Modal order={selectedOrder} onClose={handleCloseModal} />}
    </div>
  );
};

export default WaiterDashboard;
