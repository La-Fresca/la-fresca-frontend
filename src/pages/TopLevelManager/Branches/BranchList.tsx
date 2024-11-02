import BranchListTable from '@/components/TopLevelManager/Tables/Table01/App';
import InventoryList from '@/components/TopLevelManager/Tables/Branches/InventoryList';

const BranchList: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        {/* <BranchListTable /> */}
        <InventoryList />
      </div>
    </>
  );
};

export default BranchList;
