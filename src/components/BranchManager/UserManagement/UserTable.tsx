import React from 'react';
import UserRow from './UserRow';
import { User } from '@/types/user';
import { useUsers } from '@/api/useUser';
import { useQuery } from '@tanstack/react-query';


interface UserTableProps {
  filterStatus: string;
  toggleEditModal: (user: User | null) => void;
}


const UserTable: React.FC<UserTableProps> = ({ filterStatus, toggleEditModal }) => {
  const { getAllUsers } = useUsers();


  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const users: User[] = userQuery.data;

  console.log(users);

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
            <th className="px-2 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Role</th>
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
