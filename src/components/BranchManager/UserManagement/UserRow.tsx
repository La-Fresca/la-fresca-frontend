import React from 'react';
import Button from './Button';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  location: string;
  phone: string;
  group: string;
}

interface UserRowProps {
  user: User;
  toggleEditModal: (user: User) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, toggleEditModal }) => {
  return (
    <tr>
      <td className="px-2 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={`https://via.placeholder.com/150?text=${user.name.charAt(0)}`} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {user.status}
        </span>
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{user.location}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{user.group}</td>
      <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button text="Edit User" onClick={() => toggleEditModal(user)} />
      </td>
    </tr>
  );
};

export default UserRow;
