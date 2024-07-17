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
    // Example:
    setUser({ id: Number(id), name: 'Tom Cooper', email: 'cooper@gmail.com', status: 'Active', location: 'United States', phone: '+65 9308 4744', group: 'Design' });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission logic here
    navigate('/'); // Navigate back to home after submission
  };

  if (!user) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-2xl mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select
            value={user.status}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
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
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Group</label>
          <input
            type="text"
            value={user.group}
            onChange={(e) => setUser({ ...user, group: e.target.value })}
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2 transition duration-300"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
