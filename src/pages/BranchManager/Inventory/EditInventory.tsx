import InventoryEditForm from '@/components/BranchManager/Forms/Inventory/EditInventory';
import { useParams } from 'react-router-dom';

const EditInventory: React.FC = () => {
  const { inventoryId } = useParams<{ inventoryId?: string }>();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <InventoryEditForm id={inventoryId} />
      </div>
    </>
  );
};

export default EditInventory;
