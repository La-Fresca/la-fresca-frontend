import EditBranchManager from '@/components/TopLevelManager/Tables/BranchManagerManagement/EditBranchManager';

const BranchManagerEdit: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <EditBranchManager />
      </div>
    </div>
  );
};

export default BranchManagerEdit;
