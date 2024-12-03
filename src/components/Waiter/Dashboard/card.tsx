import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

interface CardProps {
  id: number;
  waiter: string;
  order: string;
  customer: string;

  onMoreDetails: (order: any) => void;
  onServeOrder: (id: number) => void;
}

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

const waiterColorMap: Record<string, string> = {}; // Map for waiter-color association
let colorIndex = 0;

const assignColorToWaiter = (waiter: string): string => {
  if (!waiterColorMap[waiter]) {
    waiterColorMap[waiter] = colours[colorIndex % colours.length];
    colorIndex++;
  }
  return waiterColorMap[waiter];
};

const Card: React.FC<CardProps> = ({ id, waiter, order, customer, onMoreDetails, onServeOrder }) => {
  const borderColor = assignColorToWaiter(waiter); // Get or assign color for the waiter

  return (
    <div 
      className={`bg-black p-4 rounded-lg shadow-lg text-white transition transform hover:scale-105 border-4`}
      style={{ borderColor }}
    >
      <div className="font-bold text-lg">{waiter}</div>
      <div className="text-sm text-gray-500">2min ago</div>
      <div className="mt-2">
        <div>Order: {order}</div>
        <div>Customer: {customer}</div>
      </div>
      <div className="mt-4 flex justify-between space-x-2 flex-wrap gap-4 items-center">
        <Button
          className="text-white px-4 py-2 rounded-lg transition transform hover:bg-gray-700 hover:-translate-y-1 border-2"
          onClick={() => onMoreDetails({ id, waiter, order, customer })}
        >
          More Details
        </Button>
        <Button
          className="text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-12 py-4 rounded-lg transition duration-300 shadow-md"
          onClick={() => onServeOrder(id)}
        >
          Served
        </Button>
      </div>
    </div>
  );
};

export default Card;
