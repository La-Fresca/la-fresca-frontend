import React from 'react';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useUsers } from '@/api/useUser';
import { useWaiterContext } from '@/context/WaiterContext';
import { FaLock } from 'react-icons/fa';

interface CardProps {
  id: string;
  waiterId: string;
  order: string;
  orderType: string;
  totalAmount: number;
  orderItems: string[];
  orderStatus: string;
  createdAt: string;
  onMoreDetails: (order: any) => void;
  isServed?: boolean;
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
  isServed,
}) => {
  const { waiterColors } = useWaiterContext();
  const { getWaiterById } = useUsers();

  const { data: waiters = [], isLoading: waitersLoading } = useQuery({
    queryKey: ['waiters'],
    queryFn: getWaiterById,
    staleTime: 5000,
  });

  const waiter = waiters.find((w) => w.id === waiterId);

  if (waitersLoading) return <div>Loading...</div>;

  return (
    <div
      className="bg-black p-4 rounded-lg shadow-lg text-white transition transform hover:scale-105 border-4"
      style={{
        borderColor: isServed ? '#22c55e' : waiterColors[waiterId] || '#808080',
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
        {isServed && (
          <Button
            className="text-white bg-green-600 px-12 py-4 rounded-lg opacity-50 cursor-not-allowed bg-green-700"
            disabled
          >
            Served <FaLock className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
