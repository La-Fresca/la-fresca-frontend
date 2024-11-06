import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface Discount {
  description: string;
  name: string;
  menuItemType: string;
  menuItemId: string;
  discountAmount: number;
  discountType: string;
  amount: number;
  offerDetails: string;
  startDate: string;
  endDate: string;
}

const AddDiscount: React.FC = () => {
  const [discount, setDiscount] = useState<Discount>({
    description: '',
    name: '',
    menuItemType: '',
    menuItemId: '',
    discountAmount: 0,
    discountType: '',
    amount: 0,
    offerDetails: '',
    startDate: '',
    endDate: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDiscount = () => {
    // Logic to save the discount (e.g., API call or state update)
    console.log('Discount saved:', discount);

    // Navigate back to the discount list page (or wherever you want after saving)
    navigate('/discounts');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add Discount</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Discount Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={discount.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="menuItemType" className="block text-sm font-medium text-gray-300">Menu Item Type</label>
            <input
              type="text"
              id="menuItemType"
              name="menuItemType"
              value={discount.menuItemType}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="menuItemId" className="block text-sm font-medium text-gray-300">Menu Item ID</label>
            <input
              type="text"
              id="menuItemId"
              name="menuItemId"
              value={discount.menuItemId}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-300">Discount Amount</label>
            <input
              type="number"
              id="discountAmount"
              name="discountAmount"
              value={discount.discountAmount}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="discountType" className="block text-sm font-medium text-gray-300">Discount Type</label>
            <input
              type="text"
              id="discountType"
              name="discountType"
              value={discount.discountType}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={discount.amount}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="offerDetails" className="block text-sm font-medium text-gray-300">Offer Details</label>
            <textarea
              id="offerDetails"
              name="offerDetails"
              value={discount.offerDetails}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={discount.startDate}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={discount.endDate}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-black bg-gray-800 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button text="Save Discount" onClick={handleSaveDiscount} />
        </div>
      </div>
    </div>
  );
};

export default AddDiscount;
