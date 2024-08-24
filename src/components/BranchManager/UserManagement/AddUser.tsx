import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission logic here
    navigate('/branch-manager/users'); // Navigate back to the main page after submission
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2">
      <div className="w-full max-w-2xl bg-gray p-6 rounded-lg"> {/* Red card with increased width */}
        <h2 className="text-4xl mb-4 font-bold text-center">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Job Category</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            >
              <option value="Waiter">Waiter</option>
              <option value="Kitchen Manager">Kitchen Manager</option>
              <option value="Store Keeper">Store Keeper</option>
              <option value="Cashier">Cashier</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password(default)</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-gray text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            />
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

export default AddUser;
