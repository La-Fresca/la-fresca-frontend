import { FC, useEffect } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SwitcherThree from '@components/BranchManager/Switchers/SwitcherThree';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BackspaceIcon } from '@heroicons/react/24/solid';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Item name is required' }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, { message: 'Price must be at least 0' }),
  image: z.coerce
    .string({ message: 'Should be a string' })
    .optional()
    .default('test'), // Zod doesn't validate file inputs directly
  available: z.boolean(),
  features: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Feature name is required' }),
        subCategories: z.array(
          z.object({
            name: z.string().min(1, { message: 'Sub Category is required' }),
            price: z.coerce
              .number()
              .min(0, { message: 'Price must be at least 0' }),
          }),
        ),
      }),
    )
    .optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const DynamicForm: FC = () => {
  const { register, control, handleSubmit, formState } =
    useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema),
    });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'features',
  });

  const { errors } = formState;

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log('Form errors:', errors);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const transformedData = {
      ...data,
      features:
        data.features?.map((feature) => ({
          name: feature.name,
          levels: feature.subCategories.map((sub) => sub.name),
          additionalPrices: feature.subCategories.map((sub) => sub.price),
        })) || [],
    };
    const jsonStr = JSON.stringify(transformedData, null, 2);
    console.log(jsonStr);
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Food Item
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Item name</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-600 mb-1">{errors.name.message}</p>
                )}
              </label>
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Description</span>
                <textarea
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-600 mb-1">
                    {errors.description.message}
                  </p>
                )}
              </label>
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Price</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('price')}
                />
                {errors.price && (
                  <p className="text-red-600">{errors.price.message}</p>
                )}
              </label>

              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Image</span>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  {...register('image')}
                />
                {errors.image && (
                  <p className="text-red-600">{errors.image.message}</p>
                )}
              </label>

              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Available</span>
                <SwitcherThree
                  fieldName="available"
                  register={register}
                  defaultValue={true}
                />
              </label>
              {errors.available && (
                <p className="text-red-600">{errors.available.message}</p>
              )}
            </div>
            <div className="mt-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative mt-4 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4"
                >
                  <button
                    type="button"
                    className="absolute top-1 mt-4 right-2 border-red-500 flex justify-center rounded-lg bg-red-500 dark:bg-red-800 p-2 font-medium text-white hover:bg-opacity-90"
                    onClick={() => remove(index)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <label className="block">
                    <span className="block mt-8 mb-1 text-gray-600">
                      Feature Name
                    </span>
                    <input
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      {...register(`features.${index}.name`)}
                    />
                  </label>
                  {errors.features?.[index]?.name && (
                    <span className="text-red-600">
                      {errors.features[index]?.name?.message}
                    </span>
                  )}
                  {field.subCategories.map((_, subIndex) => (
                    <div key={subIndex} className="flex items-center mt-4">
                      <label className="block w-full">
                        <span className="block mb-3 text-gray-600">
                          Sub Category
                        </span>
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          {...register(
                            `features.${index}.subCategories.${subIndex}.name`,
                          )}
                        />
                        <div className="min-h-12 sm:min-h-6">
                          {errors.features?.[index]?.subCategories?.[subIndex]
                            ?.name && (
                            <span className="text-red-600">
                              {
                                errors.features[index]?.subCategories?.[
                                  subIndex
                                ]?.name?.message
                              }
                            </span>
                          )}
                        </div>
                      </label>
                      <label className="block w-full ml-4">
                        <span className="block mb-3 text-gray-600">Price</span>
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="number"
                          {...register(
                            `features.${index}.subCategories.${subIndex}.price`,
                          )}
                        />
                        <div className="min-h-12 sm:min-h-6">
                          {errors.features?.[index]?.subCategories?.[subIndex]
                            ?.price && (
                            <span className="text-red-600">
                              {
                                errors.features[index]?.subCategories?.[
                                  subIndex
                                ]?.price?.message
                              }
                            </span>
                          )}
                        </div>
                      </label>
                      <button
                        type="button"
                        className="flex w-1/4 ml-3 sm:mb-0 mb-4 sm:mt-2 justify-center rounded-3xl bg-transparent p-3 font-medium text-gray hover:bg-opacity-90"
                        onClick={() =>
                          update(index, {
                            ...fields[index],
                            subCategories: fields[index].subCategories.filter(
                              (_, i) => i !== subIndex,
                            ),
                          })
                        }
                      >
                        <BackspaceIcon className="h-9 w-9 text-red-500 dark:text-red-800" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex w-full mt-3 mb-3 justify-center rounded-lg bg-yellow-200 dark:bg-yellow-600 text-black p-3 font-medium dark:text-white hover:bg-opacity-90"
                    onClick={() =>
                      update(index, {
                        ...fields[index],
                        subCategories: [
                          ...fields[index].subCategories,
                          { name: '', price: 0 },
                        ],
                      })
                    }
                  >
                    Add Sub Category
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex w-full mb-3 justify-center rounded-lg bg-blue-200 dark:bg-strokedark p-3 font-medium text-black dark:text-gray hover:bg-opacity-90"
                onClick={() =>
                  append({ name: '', subCategories: [{ name: '', price: 0 }] })
                }
              >
                Add Feature
              </button>
            </div>
            <button className="flex w-full justify-center rounded-lg bg-yellow-300 dark:bg-yellow-900 p-3 font-medium text-black dark:text-gray hover:bg-opacity-90">
              Add Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
