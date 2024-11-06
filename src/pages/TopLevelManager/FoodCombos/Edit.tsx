import ComboEditForm from '@/components/BranchManager/Forms/DynamicForm/EditFoodCombo';
import { useParams } from 'react-router-dom';

const EditCombos: React.FC = () => {
  const { comboId } = useParams<{ comboId?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <ComboEditForm id={comboId} />
      </div>
    </>
  );
};

export default EditCombos;
