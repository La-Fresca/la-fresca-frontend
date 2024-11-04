import BranchForm from '@/components/TopLevelManager/DynamicForms/EditBranch';
import { useParams } from 'react-router-dom';

const EditBranch: React.FC = () => {
  const { branchId } = useParams<{ branchId?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <BranchForm id={branchId} />
      </div>
    </>
  );
};

export default EditBranch;
