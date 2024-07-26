import StockEditForm from '@/components/Storekeeper/Forms/EditStock';
import { useParams } from 'react-router-dom';

const EditGrn: React.FC = () => {
  const { stockId } = useParams<{ stockId?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <StockEditForm id={stockId} />
      </div>
    </>
  );
};

export default EditGrn;
