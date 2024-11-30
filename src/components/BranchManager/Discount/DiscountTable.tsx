import React, { useState } from 'react';

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

interface DiscountTableProps {
  filterStatus: string;
  toggleEditModal: (discount: Discount | null) => void;
}

const DiscountTable: React.FC<DiscountTableProps> = ({ filterStatus, toggleEditModal }) => {
  // Sample data array stored in DiscountTable component
  const [discounts] = useState<Discount[]>([
    {
      description: '10% off on main course',
      name: 'Main Course Discount',
      menuItemType: 'Main Course',
      menuItemId: 'MC001',
      discountAmount: 10,
      discountType: 'Percentage',
      amount: 0,  // Update this if necessary
      offerDetails: 'Applicable to all main course items',
      startDate: '2024-11-01',
      endDate: '2024-12-01',
    },
    {
      description: '20% off on beverages',
      name: 'Beverage Discount',
      menuItemType: 'Beverages',
      menuItemId: 'BV002',
      discountAmount: 20,
      discountType: 'Percentage',
      amount: 0,  // Update this if necessary
      offerDetails: 'Applicable to all beverages',
      startDate: '2024-11-05',
      endDate: '2024-12-05',
    },
    // Add more discounts as needed
  ]);

  return (
    <div className="bg-transparent text-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-transparent">
          <tr className="font-noto-serif">
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Name</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Menu Item</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Discount Amount</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Discount Type</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Start Date</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">End Date</th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {discounts
            .filter(discount => filterStatus === 'All' || discount.discountType === filterStatus)
            .map((discount) => (
              <tr key={discount.menuItemId}>
                <td className="px-2 py-2">{discount.name}</td>
                <td className="px-2 py-2">{discount.menuItemType}</td>
                <td className="px-2 py-2">LKR {discount.discountAmount}</td>
                <td className="px-2 py-2">{discount.discountType}</td>
                <td className="px-2 py-2">{new Date(discount.startDate).toLocaleDateString()}</td>
                <td className="px-2 py-2">{new Date(discount.endDate).toLocaleDateString()}</td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => toggleEditModal(discount)}
                    className="bg-yellow-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition duration-300"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountTable;
