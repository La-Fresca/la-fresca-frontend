import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useStocks } from '@/api/useStock';
import { Stock } from '@/types/stock';
import { useInventory } from '@/api/useInventory';
import { Inventory } from '@/types/inventory';
import MultiSelect from '@components/Storekeeper/Forms/MultiCheckBox';

type CollectionPicker = {
  key: string;
  label: string;
};

const FormSchema = z.object({
  stockCollectionName: z
    .string()
    .min(1, { message: 'Inventory Name is required' }),
  batchId: z.string().min(1, { message: 'Batch ID is required' }),
  supplierName: z.string().min(1, { message: 'Supplier Name is required' }),
  initialAmount: z.coerce.number().min(1, { message: 'Quantity is required' }),
  expiryDate: z.string().min(1, { message: 'Date is Required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function StockEditForm({ id = '' }: { id?: string }) {
  const { updateStock } = useStocks();
  const { getStockById } = useStocks();
  const { getAllInventory } = useInventory();
  const [inventory, setInventory] = useState<CollectionPicker[]>([]);
  const Navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } =
    useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema),
    });

  const { errors } = formState;

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log('Form errors:', errors);
    }
  }, [errors]);

  const getInventory = async () => {
    try {
      const inventory = await getAllInventory();
      if (inventory) {
        const inventoryOptions = inventory.map((inventory: Inventory) => ({
          key: inventory.id,
          label: inventory.name,
        }));
        setInventory(inventoryOptions);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  const getStock = async () => {
    try {
      const data: Stock = await getStockById(id);
      if (data) {
        setValue('stockCollectionName', data.stockCollectionName);
        setValue('supplierName', data.supplierName);
        setValue('batchId', data.batchId);
        setValue('initialAmount', data.initialAmount);
        setValue('expiryDate', data.expiryDate);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStock();
  }, [id]);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await updateStock(id, data);
      Navigate('/storekeeper/stock');
    } catch (error: any) {
      console.error(error);
    }
  };

  if (!inventory.length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-[#000000]">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3
            className="font-medium text-xl
           text-black dark:text-white"
          >
            Edit Stock batch
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 max-h-full"
        >
          <div className="w-full md:w-3/7 space-y-4 p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">
                  Stock Item name
                </span>
                <MultiSelect
                  categories={inventory}
                  register={register}
                  fieldname="stockCollectionName"
                  setValue={setValue}
                />
                {errors.stockCollectionName && (
                  <p className="text-red-600 mb-1">
                    {errors.stockCollectionName.message}
                  </p>
                )}
              </label>

              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Batch ID</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('batchId')}
                />
                {errors.batchId && (
                  <p className="text-red-600 mb-1">{errors.batchId.message}</p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Initial Amount</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('initialAmount')}
                />
                {errors.initialAmount && (
                  <p className="text-red-600">{errors.initialAmount.message}</p>
                )}
              </label>
            </div>
          </div>
          <div className="w-full md:w-4/7 flex p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Supplier Name</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('supplierName')}
                />
                {errors.supplierName && (
                  <p className="text-red-600">{errors.supplierName.message}</p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Expire Date</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="date"
                  {...register('expiryDate')}
                />
                {errors.expiryDate && (
                  <p className="text-red-600">{errors.expiryDate.message}</p>
                )}
              </label>
              <div className="flex justify-center gap-12 mt-16">
                <Button className="flex w-full justify-center rounded-lg bg-[#b1bfd0] text-white shadow-lg min-w-0 h-16">
                  Cancel
                </Button>
                <Button
                  className="flex w-full justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg min-w-0 h-16"
                  type="submit"
                >
                  Edit Stock
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockEditForm;
