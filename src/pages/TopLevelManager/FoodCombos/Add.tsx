import ComboForm from '@/components/TopLevelManager/Forms/DynamicForm/AddFoodCombo';

const AddCombos: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <ComboForm />
      </div>
    </>
  );
};

export default AddCombos;
