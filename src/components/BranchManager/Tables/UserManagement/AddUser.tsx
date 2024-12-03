import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '@/api/useUser';
import { User } from '@/types/user';
import { swalSuccess } from '@/components/UI/SwalSuccess';

const FormSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  phoneNumber: z.string().min(1, { message: 'Contact is required' }),
  role: z.string().min(1, { message: 'Group is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm Password is required' }),
  status: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const { addUser } = useUsers();
  const { showSwal } = swalSuccess({
    message: 'User Added successfully',
  });

  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const transformedData: User = {
      ...data,
      status: data.role === 'DELIVERY_PERSON' ? 'AVAILABLE' : undefined,
    };
    try {
      addUser(transformedData);
    } catch (error) {
      console.error('Error adding user', error);
    } finally {
      setTimeout(() => {
        showSwal();
        navigate('/branch-manager/users');
      }, 2000);
    }
  };

  const { errors } = formState;

  return (
    <div className="min-h-screen bg-transparent text-white p-8">
      <h2 className="text-4xl mb-4 font-bold">Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('address')}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              placeholder="Eg: 1234567890"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block mb-2">Group</label>
            <select
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('role')}
            >
              <option value="WAITER">Waiter</option>
              <option value="KITCHEN MANAGER">Kitchen Manager</option>
              <option value="STOREKEEPER">Store Keeper</option>
              <option value="CASHIER">Cashier</option>
              <option value="DELIVERY_PERSON">Delivery Person</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Type strong password"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end mt-2 gap-4">
          <button
            type="button"
            onClick={() => navigate('/branch-manager/users')}
            className="bg-transparent hover:bg-transparent text-white px-8 py-4 border-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-12 py-4 rounded-lg transition duration-300 shadow-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
