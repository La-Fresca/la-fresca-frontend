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

  useEffect(() => {
    // Fetch user data by id and setUser
    setUser({
      id: Number(id),
      name: 'Tom Cooper',
      email: 'cooper@gmail.com',
      status: 'Active',
      location: 'United States',
      phone: '+65 9308 4744',
      group: 'Design',
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission logic here
    navigate('/branch-manager/users'); // Navigate back to home after submission
  };

  if (!user) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2">
      <div className="w-full max-w-2xl bg-gray p-6 rounded-lg"> {/* Increased max-width */}
        <h2 className="text-4xl mb-4 font-bold text-center">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Discount Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
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
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Date</label>
            <input
              type="date"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Discount Amount</label>
            <select
              value={user.group}
              onChange={(e) => setUser({ ...user, group: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            >
              <option value="Waiter">Flat</option>
              <option value="Kitchen Manager">20%</option>
              <option value="Store Keeper">10%</option>
              <option value="Cashier">5%</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Menu Item Type</label>
            <select
              value={user.group}
              onChange={(e) => setUser({ ...user, group: e.target.value })}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            >
              <option value="Waiter">Lunch</option>
              <option value="Kitchen Manager">Dinner</option>
              <option value="Store Keeper">Breakfast</option>

            </select>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={() => navigate('/branch-manager/users')}
              className="bg-transparent hover:bg-yellow-500 text-white px-4 py-2 border border-yellow-500 rounded mr-2 transition duration-300"
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
    </div>
  );
};

export default EditUser;
