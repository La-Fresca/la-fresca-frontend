import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useBranches } from '@/api/useBranches';
import { User } from '@/types/user';
import MultiSelect from '@components/Storekeeper/Forms/MultiCheckBox';

type CollectionPicker = {
  key: string;
  label: string;
};

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Branch Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  branchManager: z
    .string()
    .min(1, { message: 'Branch Manager Name is required' }),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  longitude: z.coerce.number().min(1, { message: 'Longitude is Required' }),
  latitude: z.coerce.number().min(1, { message: 'Latitude is Required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function BranchForm() {
  const { addBranch } = useBranches();
  const { getAvailableBranchManagers } = useBranches();
  const [Branch, setBranch] = useState<CollectionPicker[]>([]);
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

  const getBranch = async () => {
    try {
      const branchManagers = await getAvailableBranchManagers();

      console.log(branchManagers);
      if (branchManagers) {
        const BranchManagerOptions = branchManagers.map(
          (branchManagers: User) => ({
            key: branchManagers.id,
            label: branchManagers.firstName + ' ' + branchManagers.lastName,
          }),
        );
        setBranch(BranchManagerOptions);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await addBranch(data);
      Navigate('/top-level-manager/branches');
    } catch (error: any) {
      console.error(error);
    }
  };

  if (!Branch) {
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
            Add Branch
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 max-h-full"
        >
          <div className="w-full md:w-3/7 space-y-4 p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Name</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-600 mb-1">{errors.name.message}</p>
                )}
              </label>

              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Address</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('address')}
                />
                {errors.address && (
                  <p className="text-red-600">{errors.address.message}</p>
                )}
              </label>

              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Contact Number</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('contactNo')}
                />
                {errors.contactNo && (
                  <p className="text-red-600">{errors.contactNo.message}</p>
                )}
              </label>

              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Branch Manager</span>
                <select
                  {...register('branchManager')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                >
                  <option hidden value="">Select a branch manager</option>
                  {Branch.map((manager) => (
                    <option key={manager.key} value={manager.key} className='dark:bg-black bg-white dark:text-white text-black hover:bg-foodbg border border-black'>
                      {manager.label}
                    </option>
                  ))}
                </select>
                {errors.branchManager && (
                  <p className="text-red-600 mb-1">
                    {errors.branchManager.message}
                  </p>
                )}
              </label>

              {/* <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">
                  Branch manager
                </span>
                <MultiSelect
                  categories={Branch}
                  register={register}
                  fieldname="branchManager"
                  setValue={setValue}
                />
                {errors.branchManager && (
                  <p className="text-red-600 mb-1">
                    {errors.branchManager.message}
                  </p>
                )}
              </label> */}
            </div>
          </div>
          <div className="w-full md:w-4/7 flex p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Latitude</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('latitude')}
                />
                {errors.latitude && (
                  <p className="text-red-600">{errors.latitude.message}</p>
                )}
              </label>

              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Longitude</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('longitude')}
                />
                {errors.longitude && (
                  <p className="text-red-600">{errors.longitude.message}</p>
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
                  Add Branch
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BranchForm;
