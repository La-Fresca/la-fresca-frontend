import GrnEdit from '@/components/Storekeeper/Forms/EditGrn.tsx';
import { useParams } from 'react-router-dom';

const EditGrn: React.FC = () => {
  const { grnId } = useParams<{ grnId?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <GrnEdit id={grnId} />
      </div>
    </>
  );
};

export default EditGrn;
