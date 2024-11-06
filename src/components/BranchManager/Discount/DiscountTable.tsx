import React from 'react';

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
  const discounts: Discount[] = []; // Replace with your discount data array

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Menu Item</th>
          <th className="px-4 py-2">Discount Amount</th>
          <th className="px-4 py-2">Discount Type</th>
          <th className="px-4 py-2">Start Date</th>
          <th className="px-4 py-2">End Date</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {discounts
          .filter(discount => filterStatus === 'All' || discount.discountType === filterStatus)
          .map((discount) => (
            <tr key={discount.menuItemId}>
              <td className="px-4 py-2">{discount.name}</td>
              <td className="px-4 py-2">{discount.menuItemType}</td>
              <td className="px-4 py-2">{discount.discountAmount}</td>
              <td className="px-4 py-2">{discount.discountType}</td>
              <td className="px-4 py-2">{new Date(discount.startDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(discount.endDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">
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
  );
};

export default DiscountTable;
