import CategoryForm from '@/components/BranchManager/Forms/DynamicForm/CategoryForm';

const AddCategories: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <CategoryForm />
      </div>
    </>
  );
};

export default AddCategories;
