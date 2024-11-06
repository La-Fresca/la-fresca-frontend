import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiscountTable from '@components/BranchManager/Discount/DiscountTable';

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

const DiscountManagement: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const handleAddDiscount = () => {
    navigate('add');
  };

  const handleEditDiscount = (discount: Discount | null) => {
    if (discount) {
      navigate(`edit/${discount.menuItemId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-500 rounded bg-gray-800 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={handleAddDiscount}
            className="bg-yellow-600 hover:bg-orange-700 text-white px-4 py-2 rounded mt-2 md:mt-0 transition duration-300"
          >
            Add Discount
          </button>
        </div>
        <DiscountTable
          filterStatus={filterStatus}
          toggleEditModal={handleEditDiscount}
        />
      </div>
    </div>
  );
};

export default DiscountManagement;
