import React from 'react';
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

interface DiscountRowProps {
  discount: Discount;
  toggleEditModal: (discount: Discount) => void;
}

const DiscountRow: React.FC<DiscountRowProps> = ({ discount, toggleEditModal }) => {
  return (
    <tr className="bg-gray-800 divide-y divide-gray-700">
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">{discount.name}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">{discount.menuItemType}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">{discount.discountType}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">{discount.discountAmount}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">{discount.amount}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">{discount.offerDetails}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
        {new Date(discount.startDate).toLocaleDateString()} - {new Date(discount.endDate).toLocaleDateString()}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button text="Edit" onClick={() => toggleEditModal(discount)} />
      </td>
    </tr>
  );
};

export default DiscountRow;
