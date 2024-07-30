// OrderDetails.tsx
import React, { useState } from 'react';
import { Item } from '@components/Cashier/Dashboard/Type'; 
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PaymentMethodSelector from '@components/Cashier/Dashboard/Payment'
import Logo from '@images/logo/la-fresca.png'
import { CrossIcon } from 'node_modules/react-select/dist/declarations/src/components/indicators';
import { Food } from '@/types/food';


interface OrderDetailsProps {
  order: Food[];
  removeItemFromOrder: (itemName: string) => void;
  calculateTotal: () => string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, removeItemFromOrder, calculateTotal }) => {
  const [customerName, setCustomerName] = useState<string>('');

  return (
    <section className="w-1/3 p-4 rounded-xl shadow-lg bg-gray ml-5 h-[85vh]">
    {/* <div className="flex items-center bg-transparent p-4 ml-15">
      <img src={Logo} alt="La Fresca Logo" className="h-10 w-10 mr-2" />
      <span className="text-black dark:text-white text-2xl font-noto-serif">La Fresca</span>

    </div> */}
      <h2 className="text-2xl font-semibold mt-2  mb-8 text-center">Order Details</h2>
      <div className="width-[100%] mt-2 !overflow-scroll h-[30vh] px-2">
      <ul>
        {order.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2 p-2 bg-yellow-400 bg-opacity-15 rounded-xl">
            <div>
              <h3 className="text-base font-bold">
                {item.name} <span className="text-sm text-gray-400">x{1}</span>
              </h3>
              <p className="text-orange-600">LKR {item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeItemFromOrder(item.name)}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded transition duration-300"
            >
            <XMarkIcon className='w-5 h-5' />
            </button>
          </li>
        ))}
      </ul>
      </div>
      <div className="mt-4">
        <p className="text-lg">Total:Rs.{calculateTotal()}</p>
        <p className="text-sm">Total Discount:None</p>
        <p className="text-sm">Number Of Items:None</p> 
        <h2 className='mt-5 font-semibold'>Payment Methods</h2>   
        <PaymentMethodSelector /> 
        <button className="mt-2 w-full bg-gradient-to-r from-orange-600 to-orange-400  text-white py-2 rounded-lg shadow-lg transition duration-300 hover:from-orange-950 hover:to-orange-700">
          Pay Rs.{calculateTotal()}
        </button>
        </div>

    </section>
  );
};

export default OrderDetails;
