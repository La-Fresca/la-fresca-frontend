import React, { useState } from 'react';
import { Discount } from '@/types/discount';
import { useDiscount } from '@/api/useDiscount';
import { useQuery } from '@tanstack/react-query';

interface DiscountTableProps {
  filterStatus: string;
  toggleEditModal: (discount: Discount | null) => void;
}

const DiscountTable: React.FC<DiscountTableProps> = ({
  filterStatus,
  toggleEditModal,
}) => {
  const { getAllDiscounts } = useDiscount();

  const discountQuery = useQuery({
    queryKey: ['discount'],
    queryFn: getAllDiscounts,
  });

  if (discountQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const discounts: Discount[] = discountQuery.data;
  console.log(discounts);

  return (
    <div className="bg-transparent text-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-transparent">
          <tr className="font-noto-serif">
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
              Menu Item
            </th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
              Discount Amount
            </th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
              Discount Type
            </th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
              End Date
            </th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {discounts
            .filter(
              (discount) =>
                filterStatus === 'All' ||
                discount[0].discountType === filterStatus,
            )
            .map((discount) => (
              <tr key={discount[0].menuItemId}>
                <td className="px-2 py-2">{discount[0].name}</td>
                <td className="px-2 py-2">{discount[0].menuItemType}</td>
                <td className="px-2 py-2">LKR {discount[0].discountAmount}</td>
                <td className="px-2 py-2">{discount[0].discountType}</td>
                <td className="px-2 py-2">
                  {new Date(discount[0].startDate).toLocaleDateString()}
                </td>
                <td className="px-2 py-2">
                  {new Date(discount[0].endDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountTable;
