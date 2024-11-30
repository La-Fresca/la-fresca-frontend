import React, { useState } from 'react';
import Card from '@components/Waiter/Dashboard/card';
import Modal from '@components/Waiter/Dashboard/modal';
import WaiterTop from '@/components/Waiter/Dashboard/waiterTop';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
    Swal.fire({
      title: 'Do you want to continue?',
      text: "This action will mark the order as served.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const orderToServe = orders.find(order => order.id === id);
        if (orderToServe) {
          setOrders(orders.filter(order => order.id !== id));
          setServedOrders([...servedOrders, orderToServe]);
          Swal.fire(
            'Order Served!',
            'The order has been marked as served.',
            'success'
          );
        }
      } else {
        navigate('/dashboard'); // Navigate back to the dashboard if the user clicks "No"
      }
    });
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
          onClick={() => navigate('./served-orders')}
          className="text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-12 py-4 rounded-lg transition duration-300 shadow-md mt-8"
        >
          View Served Orders
        </button>
      </div>
      {isModalOpen && <Modal order={selectedOrder} onClose={handleCloseModal} />}
    </div>
  );
};

export default Dashboard;
