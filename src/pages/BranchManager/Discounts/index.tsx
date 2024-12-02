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

  const handleEditDiscount = (discount: Discount | null) => {
    if (discount) {
      navigate(`edit/${discount.menuItemId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-end mb-4"></div>
        <DiscountTable
          filterStatus={filterStatus}
          toggleEditModal={handleEditDiscount}
        />
      </div>
    </div>
  );
};

export default DiscountManagement;
