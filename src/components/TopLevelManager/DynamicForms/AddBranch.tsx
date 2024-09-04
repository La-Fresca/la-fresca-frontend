import { FC, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import Select from './Select/App';
import { swalSuccess } from '@/components/UI/SwalSuccess';
import GoogleMap from '@/components/User/OrderHistory/trackOrder';

// Dummy data for branch managers
const dummyBranchManagers = [
  { key: 'manager1', label: 'John Doe' },
  { key: 'manager2', label: 'Jane Smith' },
  { key: 'manager3', label: 'Alice Johnson' },
];

type BranchPicker = {
  key: string;
  label: string;
};

// Zod schema for form validation
const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  contactNo: z
    .string()
    .min(10, { message: 'Contact number must be at least 10 digits' }),
  branchManager: z.string().min(1, { message: 'Branch manager is required' }),
  location: z.string().optional(), // To store the picked location from the map
});

type FormSchemaType = z.infer<typeof FormSchema>;

const BranchForm: FC = () => {
  const { showSwal } = swalSuccess({
    message: 'Branch Added successfully',
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema),
    });

  const { errors } = formState;

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log('Form errors:', errors);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      // Here you would typically send the form data to your API
      console.log('Form data:', data);
    } catch (error) {
      console.error('Error adding branch:', error);
    } finally {
      setTimeout(() => {
        showSwal();
        // Navigate to a different page if needed
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-[#000000]">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-xl text-black dark:text-white">
            Add New Branch
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 max-h-full"
        >
          <div className="w-full md:w-3/7 space-y-4 p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Branch Name</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('name')}
                />
                {errors.address && (
                  <p className="text-red-600 mb-1">{errors.name?.message}</p>
                )}
              </label>
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Branch Address</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('address')}
                />
                {errors.address && (
                  <p className="text-red-600 mb-1">{errors.address.message}</p>
                )}
              </label>
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Contact Number</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('contactNo')}
                />
                {errors.contactNo && (
                  <p className="text-red-600 mb-1">
                    {errors.contactNo.message}
                  </p>
                )}
              </label>
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Branch Manager</span>
                <Select />
              </label>
            </div>
          </div>
          <div className="w-full md:w-4/7 flex p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Location</span>
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <GoogleMap />
                </div>
              </label>
              <div className="w-full flex justify-center items-center">
                <Button
                  className="flex w-full justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg min-w-0 h-16"
                  type="submit"
                >
                  Add Branch
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchForm;
