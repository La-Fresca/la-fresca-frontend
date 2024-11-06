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

interface EditDiscountFormProps {
  discount: Discount;
  onSubmit: (discount: Discount) => void;
}

const EditDiscountForm: React.FC<EditDiscountFormProps> = ({ discount, onSubmit }) => {
  const [formData, setFormData] = useState(discount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="p-2 w-full border border-gray-500 rounded bg-gray-800 text-white"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Discount Name"
        className="p-2 w-full border border-gray-500 rounded bg-gray-800 text-white"
      />
      {/* Similar input fields for all other discount properties */}
      <button
        type="submit"
        className="bg-yellow-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition duration-300"
      >
        Update Discount
      </button>
    </form>
  );
};

export default EditDiscountForm;
