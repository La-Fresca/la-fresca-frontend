import React from 'react';
import { Button } from '@nextui-org/react';

interface CardProps {
  id: number;
  waiter: string;
  order: string;
  customer: string;
  color: string;
  onMoreDetails: (order: any) => void;
  onServeOrder: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, waiter, order, customer, color, onMoreDetails, onServeOrder }) => {
  return (
    <div className={`bg-${color} p-4 rounded-lg shadow-lg text-white transition transform hover:scale-105`}>
      <div className="font-bold text-lg">{waiter}</div>
      <div className="text-sm text-gray-700">2min ago</div>
      <div className="mt-2">
        <div>Order: {order}</div>
        <div>Customer: {customer}</div>
      </div>
      <div className="mt-4 flex justify-between space-x-2 flex-wrap gap-4 items-center">
        <Button
          className="text-white px-4 py-2 rounded-lg transition transform hover:bg-gray-700 hover:-translate-y-1 border-2"
          onClick={() => onMoreDetails({ id, waiter, order, customer, color })}
        >
          More Details
        </Button>
        <Button
          className="bg-orange-700 text-white px-4 py-2 rounded-lg transition transform hover:bg-orange-400 hover:-translate-y-1 border-2"
          onClick={() => onServeOrder(id)}
        >
          Served
        </Button>
      </div>
    </div>
  );
};

export default Card;
