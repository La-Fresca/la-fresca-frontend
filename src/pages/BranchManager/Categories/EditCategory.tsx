import CategoryEditForm from '@/components/BranchManager/Forms/DynamicForm/CategoryEditForm';
import { useParams } from 'react-router-dom';

const EditFoods: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <CategoryEditForm id={categoryId} />
      </div>
    </>
  );
};

export default EditFoods;
