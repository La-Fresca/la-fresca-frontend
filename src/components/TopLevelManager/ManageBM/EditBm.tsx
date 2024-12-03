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
  branchName: z.string().min(1, { message: 'Branch Name is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const EditBm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [Loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { getUserById, updateUser } = useUsers();
  const { showSwal } = swalSuccess({
    message: 'Branch Manager updated successfully',
  });

  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const transformedData: User = {
      id: userId,
      ...data,
      role: 'BRANCH MANAGER', // Ensures the role is always 'Branch Manager'
    };
    try {
      await updateUser(transformedData);
    } catch (error) {
      console.error('Error updating Branch Manager', error);
    } finally {
      setTimeout(() => {
        showSwal();
        navigate('/top-level-manager/branchmanagers');
      }, 2000);
    }
  };

  const fetchUser = async () => {
    try {
      const user = await getUserById(userId);
      setUser(user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Branch Manager', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (Loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-transparent text-white p-8">
      <h2 className="text-4xl mb-4 font-bold">Edit Branch Manager</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              value={user?.firstName}
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
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
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
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
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('email')}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              value={user?.status}
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('status')}
              onChange={(e) => setUser({ ...user, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Branch Name</label>
            <input
              type="text"
              value={user?.branchName}
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('branchName')}
              onChange={(e) => setUser({ ...user, branchName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              value={user?.phoneNumber}
              className="w-full p-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              {...register('phoneNumber')}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 gap-4">
          <button
            type="button"
            onClick={() => navigate('/top-level-manager/branchmanagers')}
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

export default EditBm;
