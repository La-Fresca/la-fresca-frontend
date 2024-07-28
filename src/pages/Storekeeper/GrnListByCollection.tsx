import StockListByCollection from '@/components/Storekeeper/Tables/NextTables/GrnListbyCollection';
import { useParams } from 'react-router-dom';

const ViewGrnByCollection: React.FC = () => {
  const { collection } = useParams<{ collection?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <StockListByCollection collectionName={collection} />
      </div>
    </>
  );
};

export default ViewGrnByCollection;
