import { useEffect } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useStocks } from '@/api/useStocks';
import { Stock } from '@/types/stock';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  batchId: z.string().min(1, { message: 'Batch ID is required' }),
  availableAmount: z.coerce
    .number()
    .min(1, { message: 'Quantity is required' }),
  lowerLimit: z.coerce.number().min(1, { message: 'Lower Limit required' }),
  expiryDate: z.string().min(1, { message: 'Date is Required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function StockEditForm({ id = '' }: { id?: string }) {
  const { updateStock } = useStocks();
  const { getStockById } = useStocks();
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

  const getStock = async () => {
    try {
      const data: Stock = await getStockById(id);
      if (data) {
        setValue('name', data.name);
        setValue('batchId', data.batchId);
        setValue('availableAmount', data.availableAmount);
        setValue('lowerLimit', data.availableAmount);
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
      Navigate('/branch-manager/stocks');
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-[#000000]">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3
            className="font-medium text-xl
           text-black dark:text-white"
          >
            Add Stocks
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
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-600 mb-1">{errors.name.message}</p>
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
                <span className="block mb-1 text-gray-600">
                  Available Amount
                </span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('availableAmount')}
                />
                {errors.availableAmount && (
                  <p className="text-red-600">
                    {errors.availableAmount.message}
                  </p>
                )}
              </label>
            </div>
          </div>
          <div className="w-full md:w-4/7 flex p-6.5">
            <div className="w-full">
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Lower Limit</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('lowerLimit')}
                />
                {errors.lowerLimit && (
                  <p className="text-red-600">{errors.lowerLimit.message}</p>
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
                  Add Stock
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
