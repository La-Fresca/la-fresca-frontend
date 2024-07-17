import React, { useState } from 'react';
import UserTable from '@components/BranchManager/UserManagement/UserTable';
import AddUserModal from '@components/BranchManager/UserManagement/AddUser';
import EditUserModal from '@components/BranchManager/UserManagement/EditUser';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  location: string;
  phone: string;
  group: string;
}

const User: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);
  const toggleEditModal = (user: User | null = null) => {
    setEditingUser(user);
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={toggleAddModal}
            className="bg-orange-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
          >
            Add User
          </button>
        </div>
        <UserTable
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          toggleEditModal={toggleEditModal}
        />
        {isAddModalOpen && <AddUserModal toggleModal={toggleAddModal} />}
        {isEditModalOpen && editingUser && (
          <EditUserModal toggleModal={toggleEditModal} user={editingUser} />
        )}
      </div>
    </div>
  );
};

export default User;
