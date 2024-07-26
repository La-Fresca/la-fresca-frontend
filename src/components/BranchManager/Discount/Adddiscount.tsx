import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission logic here
    navigate('/branch-manager/users'); // Navigate back to the main page after submission
  };

  return (
    <div className="min-h-screen bg-transparent text-white p-8">
      <h2 className="text-2xl mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-2/3 p-2 border border-gray-500 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/3 p-2 border border-gray-500 rounded  text-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-2/3 p-2 border border-gray-500 rounded  text-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
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
            className="w-2/3 p-2 border border-gray-500 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-2/3 p-2 border border-gray-500 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Group</label>
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-2/3 p-2 border border-gray-500 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/branch-manager/users')}
            className="bg-gray-600 hover:bg-transparent border text-white px-4 py-2 rounded mr-2 transition duration-300"
          >
            Cancel
          </button>
          <button type="submit" className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded transition duration-300">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
