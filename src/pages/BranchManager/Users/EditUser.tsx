import EditUser from '@/components/BranchManager/UserManagement/EditUser';

const UserEdit: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <EditUser />
      </div>
    </div>
  );
};

export default UserEdit;
