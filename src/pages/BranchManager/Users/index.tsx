import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '@components/BranchManager/UserManagement/UserTable';
import { User } from '@/types/user';

const UserManagement: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('add');
  };

  const handleEditUser = (user: User | null) => {
    if (user) {
      navigate(`edit/${user.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-500 rounded bg-gray-800 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={handleAddUser}
            className=" text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-8 py-4 rounded-lg transition duration-300 shadow-md"
          >
            Add User
          </button>
        </div>
        <UserTable
          filterStatus={filterStatus}
          toggleEditModal={handleEditUser}
        />
      </div>
    </div>
  );
};

export default UserManagement;
