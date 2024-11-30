import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDiscount } from '@/api/useDiscount';
import { Discount } from '@/types/discount';
import { swalSuccess } from '@/components/UI/SwalSuccess';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Discount Name is required' }),
  menuItemType: z.string().min(1, { message: 'Menu Item Type is required' }),
  menuItemId: z.string().min(1, { message: 'Menu Item ID is required' }),
  discountAmount: z.coerce
    .number()
    .multipleOf(0.01)
    .min(0, { message: 'Discount amount must be at least 0' }),
  amount: z.coerce
    .number()
    .multipleOf(0.01)
    .min(0, { message: 'Amount must be at least 0' }),
  // Add other fields here
  discountType: z.enum(['Percentage', 'Fixed'], {
    required_error: 'Discount Type is required',
  }),
  offerDetails: z.string().min(1, { message: 'Offer Details is required' }),
  startDate: z.string().min(1, { message: 'Start Date is required' }),
  endDate: z.string().min(1, { message: 'End Date is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const AddDiscount: React.FC = () => {
  const navigate = useNavigate();

  const { addDiscount } = useDiscount();
  const { showSwal } = swalSuccess({
    message: 'Discount Added successfully',
  });

  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      addDiscount(data);
    } catch (error) {
      console.error('Error adding discount', error);
    } finally {
      setTimeout(() => {
        showSwal();
        navigate('/branch-manager/discounts');
      }, 2000);
    }
  };

  const { errors } = formState;
  console.log(errors);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add Discount</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Discount Name
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('name')}
              />
            </div>

            <div>
              <label
                htmlFor="menuItemType"
                className="block text-sm font-medium text-gray-300"
              >
                Menu Item Type
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('menuItemType')}
              />
            </div>

            <div>
              <label
                htmlFor="menuItemId"
                className="block text-sm font-medium text-gray-300"
              >
                Menu Item ID
              </label>
              <input
                type="text"
                id="menuItemId"
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('menuItemId')}
              />
            </div>

            <div>
              <label
                htmlFor="discountAmount"
                className="block text-sm font-medium text-gray-300"
              >
                Discount Amount (LKR)
              </label>
              <input
                type="number"
                id="discountAmount"
                className="w-full p-2 mt-1 text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('discountAmount')}
              />
            </div>

            <div>
              <label
                htmlFor="discountType"
                className="block text-sm font-medium text-gray-300"
              >
                Discount Type
              </label>
              <select
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('discountType')}
              >
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-300"
              >
                Amount (LKR)
              </label>
              <input
                type="number"
                id="amount"
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('amount')}
              />
            </div>

            <div>
              <label
                htmlFor="offerDetails"
                className="block text-sm font-medium text-gray-300"
              >
                Offer Details
              </label>
              <textarea
                id="offerDetails"
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('offerDetails')}
              />
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-300"
              >
                Start Date
              </label>
              <input
                type="datetime-local"
                id="startDate"
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('startDate')}
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-300"
              >
                End Date
              </label>
              <input
                type="datetime-local"
                id="endDate"
                className="w-full p-2 mt-1  text-white bg-gray border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                {...register('endDate')}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/branch-manager/discounts')}
              className="bg-transparent hover:bg-transparent text-white px-8 py-4 border-2 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDiscount;
