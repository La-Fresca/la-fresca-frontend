import React from 'react';
import Button from './Button';
import { AiFillBulb } from 'react-icons/ai';
import { User } from '@/types/user';
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
            <img
              className="h-10 w-10 rounded-full"
              src={`https://via.placeholder.com/150?text=${user.email.charAt(0)}`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">
              {user.firstName + ' ' + user.lastName}
            </div>
            <div className="text-sm text-gray-400">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green text-white flex items-center' : 'bg-gray-600 text-gray-100 flex items-center'}`}
        >
          {user.status === 'Active' && (
            <AiFillBulb className="text-white  mr-1" />
          )}
        </span>
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
        {user.address}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
        {user.phoneNumber}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
        {user.role}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button text="Edit" onClick={() => toggleEditModal(user)} />
      </td>
    </tr>
  );
};

export default UserRow;
