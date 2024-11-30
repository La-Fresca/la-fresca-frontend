import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '@/api/useUser';
import { User } from '@/types/user';
import { swalSuccess } from '@/components/UI/SwalSuccess';

const FormSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  phoneNumber: z.string().min(1, { message: 'Contact is required' }),
  role: z.string().min(1, { message: 'Group is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  console.log(userId);
  const [Loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { getUserById } = useUsers();
  const { updateUser } = useUsers();
  const { showSwal } = swalSuccess({
    message: 'User Added successfully',
  });

  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const { errors } = formState;
  console.log(errors);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const transformedData: User = {
      id: userId,
      cafeId: 'cafe 1',
      ...data,
    };
    try {
      updateUser(transformedData);
    } catch (error) {
      console.error('Error adding user', error);
    } finally {
      setTimeout(() => {
        showSwal();
        navigate('/branch-manager/users');
      }, 2000);
    }
  };

  const fetchUser = async () => {
    try {
      const user = await getUserById(userId);
      setUser(user);
      setLoading(false);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (Loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-transparent text-white p-8 ">
      <h2 className="text-xl mb-4 font-bold">Edit User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            value={user?.firstName}
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('firstName')}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
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
            value={user?.lastName}
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('lastName')}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={user?.email}
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('email')}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select
            value={user?.status}
            className="w-2/3 p-2 border border-gray-500 rounded bg-gray-800 text-white bg-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('status')}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            value={user?.address}
            className="w-2/3 p-2 border border-gray-500 rounded bg-gray-800 text-white bg-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('address')}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            value={user?.phoneNumber}
            className="w-2/3 p-2 border border-gray-500 rounded bg-gray-800 text-white bg-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('phoneNumber')}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Group</label>
          <select
            className="w-2/3 p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            {...register('role')}
            defaultValue={user?.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="WAITER">Waiter</option>
            <option value="KITCHEN MANAGER">Kitchen Manager</option>
            <option value="STOREKEEPER">Store Keeper</option>
            <option value="CASHIER">Cashier</option>
          </select>
        </div>
        <div className="flex items-center justify-end mt-4 gap-4">
          <button
            type="button"
            onClick={() => navigate('/branch-manager/users')}
            className="bg-transparent hover:bg-transparent text-white px-8 py-4 border-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 text-black px-4 py-2 rounded transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
