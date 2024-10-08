import React, { useState } from 'react';
import Card from '@components/Waiter/Dashboard/card';
import Modal from '@components/Waiter/Dashboard/modal';
import WaiterTop from '@/components/Waiter/Dashboard/waiterTop';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
  { id: 1, waiter: 'Waiter 01', order: '#01011', customer: 'John Doe', color: 'yellow-500' },
  { id: 2, waiter: 'Waiter 03', order: '#01321', customer: 'John Silva', color: 'red-500' },
  { id: 3, waiter: 'Waiter 02', order: '#01356', customer: 'Dasun Thathsara', color: 'violet-900' },
  { id: 4, waiter: 'Waiter 04', order: '#01548', customer: 'Kasun Hansamal', color: 'blue-500' },
  { id: 5, waiter: 'Waiter 03', order: '#01658', customer: 'Ravindu Athukorala', color: 'red-500' },
  { id: 6, waiter: 'Waiter 02', order: '#01256', customer: 'Kasun Perera', color: 'violet-900' },
  { id: 7, waiter: 'Waiter 01', order: '#01541', customer: 'John Perera', color: 'yellow-500' },
  { id: 8, waiter: 'Waiter 04', order: '#01891', customer: 'John Fonseka', color: 'blue-500' },
];

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [servedOrders, setServedOrders] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const navigate = useNavigate();

  const handleMoreDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleServeOrder = (id: number) => {
    const orderToServe = orders.find(order => order.id === id);
    if (orderToServe) {
      setOrders(orders.filter(order => order.id !== id));
      setServedOrders([...servedOrders, orderToServe]);
    }
  };

  return (
    <div className="min-h-screen text-white flex">
      <div className="flex-1 p-4">
        <WaiterTop />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {orders.map(order => (
            <Card key={order.id} {...order} onMoreDetails={handleMoreDetails} onServeOrder={handleServeOrder} />
          ))}
        </div>
        <button
          onClick={() => navigate('waiter/served-orders')}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          View Served Orders
        </button>
      </div>
      {isModalOpen && <Modal order={selectedOrder} onClose={handleCloseModal} />}
    </div>
  );
};

export default Dashboard;
