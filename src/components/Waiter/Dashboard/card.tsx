import React from 'react';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useUsers } from '@/api/useUser';
import { useWaiterContext } from '@/context/WaiterContext';

interface CardProps {
  id: string;
  waiterId: string;
  order: string;
  customer: string;
  orderType: string;
  totalAmount: number;
  orderItems: string[];
  orderStatus: string;
  createdAt: string;

  onMoreDetails: (order: any) => void;
  onServeOrder: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  waiterId,
  order,
  orderType,
  totalAmount,
  orderItems,
  orderStatus,
  createdAt,
  onMoreDetails,
  onServeOrder,
}) => {
  const { waiterColors } = useWaiterContext();
  const { getWaiterById } = useUsers();

  const { data: waiters = [], isLoading: waitersLoading } = useQuery({
    queryKey: ['waiters'],
    queryFn: getWaiterById,
    staleTime: 5000, // Match the staleTime from WaiterTop
  });

  const waiter = waiters.find((w) => w.id === waiterId);

  // Debug logs
  console.log('Waiter ID:', waiterId);
  console.log('All Waiter Colors:', waiterColors);
  console.log('This Waiter Color:', waiterColors[waiterId]);
  console.log('Card rendered for waiter:', waiterId);
  console.log('Available colors in Card:', waiterColors);
  console.log('Color for this waiter:', waiterColors[waiterId]);
  console.log('All waiters:', waiters);

  if (waitersLoading) return <div>Loading...</div>;

  return (
    <div
      className="bg-black p-4 rounded-lg shadow-lg text-white transition transform hover:scale-105 border-4"
      style={{
        borderColor: waiterColors[waiterId] || '#808080',
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Order: {order}</h3>
          {waiter && (
            <p className="text-sm text-gray-500">
              Assigned to: {waiter.firstName} {waiter.lastName}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <div>Order: {order}</div>
      </div>
      <div className="mt-4 flex justify-between space-x-2 flex-wrap gap-4 items-center">
        <Button
          className="text-white px-4 py-2 rounded-lg transition transform hover:bg-gray-700 hover:-translate-y-1 border-2"
          onClick={() => onMoreDetails({ id, waiterId, order })}
        >
          More Details
        </Button>
        <Button
          className="text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-12 py-4 rounded-lg transition duration-300 shadow-md"
          onClick={() => onServeOrder(id)}
        >
          Serve
        </Button>
      </div>
    </div>
  );
};

export default Card;
