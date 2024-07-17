import AddUser from '@/components/BranchManager/UserManagement/AddUser';

const UserAdd: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <AddUser />
      </div>
    </div>
  );
};

export default UserAdd;
