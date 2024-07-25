// OrderDetails.tsx
import React, { useState } from 'react';
import { Item } from '@components/Cashier/Dashboard/Type'; 
import { TrashIcon } from '@heroicons/react/24/outline'
import Logo from '@images/logo/la-fresca.png'


interface OrderDetailsProps {
  order: Item[];
  removeItemFromOrder: (itemName: string) => void;
  calculateTotal: () => string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, removeItemFromOrder, calculateTotal }) => {
  const [customerName, setCustomerName] = useState<string>('');

  return (
    <section className="w-1/3 p-4 rounded shadow-lg border border-gray-700 ml-5">
    <div className="flex items-center bg-transparent p-4 ml-15">
      <img src={Logo} alt="La Fresca Logo" className="h-10 w-10 mr-2" />
      <span className="text-black dark:text-white text-2xl font-noto-serif">La Fresca</span>
      <span> </span>
    </div>
      <h2 className="text-xl font-semibold mt-6 mb-4">Order Details</h2>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="p-2 mb-4 rounded bg-black text-white border border-gray-700 focus:outline-none w-full"
      />
      <ul>
        {order.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2 p-2 bg-yellow-400 bg-opacity-25 rounded">
            <div>
              <h3 className="text-base font-bold">
                {item.name} <span className="text-sm text-gray-400">x{item.quantity}</span>
              </h3>
              <p className="text-orange-500">${item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeItemFromOrder(item.name)}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded transition duration-300"
            >
            <TrashIcon className='w-5 h-5' />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="text-lg">Total: ${calculateTotal()}</p>
        <p className="text-sm">Total Discount:None</p>
        <p className="text-sm">Number Of Items:None</p>
        <button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition duration-300">
          Pay ${calculateTotal()}
        </button>
      </div>
    </section>
  );
};

export default OrderDetails;
