import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  location: string;
  phone: string;
  group: string;
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data by id and setUser
    setUser({ id: Number(id), name: 'Tom Cooper', email: 'cooper@gmail.com', status: 'Active', location: 'United States', phone: '+65 9308 4744', group: 'Design' });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.name || !user?.email || !user?.location || !user?.phone || !user?.group) {
      setError('All fields are required!');
      return;
    }
    // Handle the form submission logic here
    navigate('/branch-manager/users');
  };

  if (!user) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-transparent text-white p-8">
      <h2 className="text-4xl mb-4 font-bold">Edit User</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              value={user.status}
              onChange={(e) => setUser({ ...user, status: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={user.location}
              onChange={(e) => setUser({ ...user, location: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Group</label>
            <select
              value={user.group}
              onChange={(e) => setUser({ ...user, group: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            >
              <option value="Waiter">Waiter</option>
              <option value="Kitchen Manager">Kitchen Manager</option>
              <option value="Store Keeper">Store Keeper</option>
              <option value="Cashier">Cashier</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 gap-4">
          <button
            type="button"
            onClick={() => navigate('/branch-manager/users')}
            className="bg-transparent hover:bg-transparent text-white px-8 py-4 border-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button type="submit" className=" text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-12 py-4 rounded-lg transition duration-300 shadow-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
