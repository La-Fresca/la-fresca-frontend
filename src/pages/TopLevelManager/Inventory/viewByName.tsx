import StockListByCollection from '@/components/TopLevelManager/Inventory/Tables/NextTables/GrnListbyCollection';
import { useParams } from 'react-router-dom';

const BranchList: React.FC = () => {
  const { collection } = useParams<{ collection?: string }>();
  console.log(collection);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <StockListByCollection collectionName={collection} />
      </div>
    </>
  );
};

export default BranchList;
