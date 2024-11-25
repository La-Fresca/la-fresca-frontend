import { Button } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
interface Discount {
  name: string;
  description: string;
  menuItemType: string;
  menuItemId: string;
  discountAmount: number;
  discountType: string;
  amount: number;
  offerDetails: string;
  startDate: string;
  endDate: string;
}

const EditDiscount: React.FC = () => {
  const { menuItemId } = useParams<{ menuItemId: string }>();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample data - replace with actual fetching logic
  const mockDiscountData: Discount[] = [
    {
      name: 'Main Course Discount',
      description: '10% off on main course',
      menuItemType: 'Main Course',
      menuItemId: 'MC001',
      discountAmount: 10,
      discountType: 'Percentage',
      amount: 0,
      offerDetails: 'Applicable to all main course items',
      startDate: '2024-11-01',
      endDate: '2024-12-01',
    },
    // Add more mock discounts as needed
  ];

  useEffect(() => {
    // Fetch discount data by menuItemId
    const foundDiscount = mockDiscountData.find((d) => d.menuItemId === menuItemId);
    setDiscount(foundDiscount || null);
  }, [menuItemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if ((name === 'discountAmount' || name === 'amount') && parseFloat(value) < 0) {
      setError(`${name} cannot be negative.`);
      return;
    }

    setError(null); // Clear error when value is valid

    setDiscount((prev) => prev ? ({
      ...prev,
      [name]: value,
    }) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!discount) return; // If no discount data, return early

    if (discount.discountAmount < 0 || discount.amount < 0) {
      setError("Discount Amount and Amount cannot be negative.");
      return;
    }

    // Handle form submission logic (e.g., API call or state update)
    console.log('Updated Discount:', discount);

    // Navigate back to the discount list page (or wherever you want after saving)
    navigate('/branch-manager/discounts');
  };

  if (!discount) {
    return <div className="text-white">Loading discount data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-2xl mb-4 font-bold mt-6">Edit Discount</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="mt-1">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={discount.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>


          {/* <div className="mt-1">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={discount.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div> */}

          <div className="mt-1">
            <label className="block mb-2">Menu Item Type</label>
            <input
              type="text"
              name="menuItemType"
              value={discount.menuItemType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          
          <div className="mt-1">
            <label className="block mb-2">Menu Item ID</label>
            <input
              type="text"
              name="menuItemId"
              value={discount.menuItemId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mt-1">
            <label className="block mb-2">Discount Amount (LKR)</label>
            <input
              type="number"
              name="discountAmount"
              value={discount.discountAmount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mt-1">
            <label className="block mb-2">Discount Type</label>
            <select
              name="discountType"
              value={discount.discountType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            >
              <option value="Percentage">Percentage</option>
              <option value="Fixed Amount">Fixed</option>
            </select>
          </div>
          <div className="mt-1">
            <label className="block mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={discount.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mt-1">
            <label className="block mb-2">Offer Details</label>
            <textarea
              name="offerDetails"
              value={discount.offerDetails}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mt-1">
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={discount.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mt-1">
            <label className="block mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={discount.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="flex items-center justify-end gap-4 mt-6">
          <Button
            type="button"
            onClick={() => navigate('/branch-manager/discounts')}
            className="bg-transparent hover:bg-transparent text-white px-4 py-2 border-white border-2 rounded-lg transition duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className= "text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-6 py-2 rounded-lg transition duration-300 shadow-md"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditDiscount;
