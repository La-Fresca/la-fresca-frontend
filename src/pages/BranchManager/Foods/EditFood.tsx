import EditForm from '@/components/BranchManager/Forms/DynamicForm/EditForm';
import { useParams } from 'react-router-dom';

const EditFoods: React.FC = () => {
  const { foodId } = useParams<{ foodId?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <EditForm id={foodId} />
      </div>
    </>
  );
};

export default EditFoods;
