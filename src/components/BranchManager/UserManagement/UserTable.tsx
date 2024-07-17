import React from 'react';
import UserRow from './UserRow';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  location: string;
  phone: string;
  group: string;
}

interface UserTableProps {
  searchTerm: string;
  filterStatus: string;
  toggleEditModal: (user: User) => void;
}

const users: User[] = [
  { id: 1, name: 'Tom Cooper', email: 'cooper@gmail.com', status: 'Active', location: 'United States', phone: '+65 9308 4744', group: 'Design' },
  { id: 2, name: 'Leslie Alexander', email: 'lawson@gmail.com', status: 'Active', location: 'Canada', phone: '+65 8689 9346', group: 'Development' },
  { id: 3, name: 'Kristin Watson', email: 'watson@gmail.com', status: 'Inactive', location: 'Germany', phone: '+62-896-5554-32', group: 'Marketing' },
  // Add more users as needed
];

const UserTable: React.FC<UserTableProps> = ({ searchTerm, filterStatus, toggleEditModal }) => {
  const filteredUsers = users.filter(user => {
    const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearchTerm && matchesFilterStatus;
  });

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map(user => (
            <UserRow key={user.id} user={user} toggleEditModal={toggleEditModal} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
