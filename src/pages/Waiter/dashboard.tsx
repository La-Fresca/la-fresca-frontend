import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from '@components/Waiter/Dashboard/card';
import Modal from '@components/Waiter/Dashboard/modal';
import WaiterTop from '@/components/Waiter/Dashboard/waiterTop';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useOrders } from '@/api/useOrder';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface OrderItemStatus {
  orderId: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { getAssignedToWaiterOrders, updateOrder } = useOrders();
  const queryClient = useQueryClient();
  const [servedOrders, setServedOrders] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const navigate = useNavigate();

  // Get cafeId from token
  const getCafeId = () => {
    const token = Cookies.get('_auth');
    return token ? jwtDecode<any>(token).cafeId : null;
  };

  // Add React Query hook
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['waiterOrders'],
    queryFn: () => getAssignedToWaiterOrders(getCafeId()),
  });

  const updateOrderMutation = useMutation({
    mutationFn: (orderId: string) => {
      const data: OrderItemStatus = {
        id: orderId,
        orderStatus: 'DELIVERED',
      };
      return updateOrder(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['waiterOrders']);
      queryClient.invalidateQueries(['servedOrders']);
    },
  });

  const handleMoreDetails = (order: any) => {
    const fullOrder = orders.find((o) => o.id === order.id);
    setSelectedOrder(fullOrder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleServeOrder = (id: string) => {
    Swal.fire({
      title: 'Do you want to continue?',
      text: 'This action will mark the order as served.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire(
              'Order Served!',
              'The order has been marked as served.',
              'success',
            );
          },
          onError: () => {
            Swal.fire('Error!', 'Failed to update order status.', 'error');
          },
        });
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white flex">
      <div className="flex-1 p-4">
        <WaiterTop />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {orders.map((order) => (
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
              onServeOrder={handleServeOrder}
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

export default Dashboard;
