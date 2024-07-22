import Grn from '@/components/Storekeeper/Forms/NewGrn.tsx';

const AddGrn: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <Grn />
      </div>
    </>
  );
};

export default AddGrn;
