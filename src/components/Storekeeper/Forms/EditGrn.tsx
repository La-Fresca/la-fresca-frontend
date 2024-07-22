import { useEffect } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const FormSchema = z.object({
  supplier: z.string().min(1, { message: 'Supplier is required' }),
  item: z.string().min(1, { message: 'Item is required' }),
  quantity: z.number().min(1, { message: 'Quantity is required' }),
  createdAt: z.string().min(1, { message: 'Date is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  inventory: z.string().min(1, { message: 'Inventory is required' }),
  units: z.string().min(1, { message: 'Units is required' }),
  expire: z.string().min(1, { message: 'Expire is required' }),
  batchcode: z.string().min(1, { message: 'Batchcode is required' }),
  roq: z.number().min(1, { message: 'ROQ is required' }),
  unitcost: z.number().min(1, { message: 'Unitcost is required' }),
  totalcost: z.number().min(1, { message: 'Totalcost is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface Props {
  id: string | undefined;
}

function GrnForm({ id }: Props) {
  const Navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const { errors } = formState;

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log('Form errors:', errors);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log('Form data:', data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-[#000000]">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3
            className="font-medium text-xl
           text-black dark:text-white"
          >
            New GRN
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 max-h-full"
        >
          <div className="w-full md:w-3/7 space-y-4 p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Supplier name</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                />
                {errors.supplier && (
                  <p className="text-red-600 mb-1">{errors.supplier.message}</p>
                )}
              </label>

              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Item name</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                />
                {errors.item && (
                  <p className="text-red-600 mb-1">{errors.item.message}</p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Quantitiy</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('quantity')}
                />
                {errors.quantity && (
                  <p className="text-red-600">{errors.quantity.message}</p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Unit Cost</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('unitcost')}
                />
                {errors.unitcost && (
                  <p className="text-red-600">{errors.unitcost.message}</p>
                )}
              </label>
            </div>
          </div>
          <div className="w-full md:w-4/7 flex p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Batch Code</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                />
                {errors.batchcode && (
                  <p className="text-red-600 mb-1">
                    {errors.batchcode.message}
                  </p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">ROQ Level</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('roq')}
                />
                {errors.roq && (
                  <p className="text-red-600">{errors.roq.message}</p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Total Cost</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('totalcost')}
                />
                {errors.totalcost && (
                  <p className="text-red-600">{errors.totalcost.message}</p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Expire Date</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="date"
                  {...register('expire')}
                />
                {errors.expire && (
                  <p className="text-red-600">{errors.expire.message}</p>
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

export default GrnForm;
