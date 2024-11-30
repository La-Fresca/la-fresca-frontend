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
      cafeId: 'cafe 1',
      ...data,
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
    <div className="min-h-screen bg-transparent text-white">
      <h2 className="text-4xl mb-4 font-bold">Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('address')}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Group</label>
          <select
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('role')}
          >
            <option value="WAITER">Waiter</option>
            <option value="KITCHEN MANAGER">Kitchen Manager</option>
            <option value="STOREKEEPER">Store Keeper</option>
            <option value="CASHIER">Cashier</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex items-center mt-15">
          <button
            type="button"
            onClick={() => navigate('/branch-manager/users')}
            className="bg-gray-600 hover:bg-transparent border text-white px-4 py-2 rounded mr-2 transition duration-300"
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
      </form>
    </div>
  );
};

export default AddUser;
