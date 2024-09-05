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
  filterStatus: string;
  toggleEditModal: (user: User | null) => void;
}

const users: User[] = [
  { id: 1, name: 'Tom Cooper', email: 'cooper@gmail.com', status: 'Active', location: 'Battaramulla', phone: '+94 78 596 8986', group: 'Waiter' },
  { id: 2, name: 'Leslie Alexander', email: 'lawson@gmail.com', status: 'Active', location: 'Borella', phone: '+94 71 596 2521', group: 'Delivery person' },
  { id: 3, name: 'Kristin Watson', email: 'watson@gmail.com', status: 'Inactive', location: 'Havelock', phone: '+94 76 596 4378', group: 'Cashier' },
  // Add more users as needed
];

const UserTable: React.FC<UserTableProps> = ({ filterStatus, toggleEditModal }) => {
  const filteredUsers = users.filter(user => filterStatus === 'All' || user.status === filterStatus);

  return (
    <div className="bg-transparent text-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-transparent">
          <tr className='font-noto-serif'>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">User</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Status</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Location</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Phone</th>
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Job category</th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {filteredUsers.map(user => (
            <UserRow key={user.id} user={user} toggleEditModal={toggleEditModal} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
