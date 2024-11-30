import { FC, useEffect, useState } from 'react';
import { set, z } from 'zod';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import ImageInput from '@components/BranchManager/Inputs/ImageInput';
import { Button } from '@nextui-org/react';
import MultiSelect from '@components/BranchManager/Forms/MultiCheckBox';
import { useNavigate } from 'react-router-dom';
import { useUpload } from '@/api/useUpload';
import { useFoods } from '@/api/useFoodItem';
import { Food } from '@/types/food';
import { useCategories } from '@/api/useCategory';
import { Category } from '@/types/category';
import { swalSuccess } from '@/components/UI/SwalSuccess';

type CategoryPicker = {
  key: string;
  label: string;
};

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Item name is required' }),
  categories: z.array(z.string()).min(1, { message: 'Categories is required' }),
  description: z.string().optional(),
  cost: z.coerce.number().multipleOf(0.01).optional(),
  price: z.coerce
    .number()
    .multipleOf(0.01)
    .min(0, { message: 'Price must be at least 0' }),
  image: z.coerce
    .string({ message: 'Should be a string' })
    .optional()
    .default('test'),
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

function EditForm({ id = '' }: { id?: string }) {
  const { showSwal } = swalSuccess({
    message: 'Item Added successfully',
  });
  const Navigate = useNavigate();
  const { updateFood } = useFoods();
  const { getFoodById } = useFoods();
  const { uploadImage } = useUpload();
  const { getAllCategories } = useCategories();
  const [categories, setCategories] = useState<CategoryPicker[]>([]);
  const [item, setItem] = useState<Food | null>(null);

  const { register, control, handleSubmit, formState, setValue } =
    useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema),
    });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'features',
  });

  const { errors } = formState;

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log('Form errors:', errors);
    }
  }, [errors]);

  const getFood = async () => {
    try {
      const data: Food = await getFoodById(id);
      if (data) {
        setItem(data);
        setValue('name', data.name);
        setValue('categories', data.categories || []);
        setValue('description', data.description || '');
        setValue('cost', data.cost);
        setValue('price', data.price);
        setValue('image', data.image);
        if (data.features) {
          const features = data.features.map((feature: any) => ({
            name: feature.name,
            subCategories: feature.levels.map((level: any, idx: number) => ({
              name: level,
              price: feature.additionalPrices[idx],
            })),
          }));
          setValue('features', features);
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFood();
  }, [id]);

  const getCategories = async () => {
    try {
      const categories = await getAllCategories();
      if (categories) {
        const categoryOptions = categories.map((category: Category) => ({
          key: category.id,
          label: category.name,
        }));
        setCategories(categoryOptions);
      }
    } catch (error) {
      console.error('Error getting categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    let imageUrl = data.image;
    if (imageFile) {
      try {
        const respose = await uploadImage(imageFile);
        if (respose) {
          imageUrl = respose.fileUrl;
          setValue('image', imageUrl);
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const transformedData: Food = {
      cafeId: 'cafe 1',
      ...data,
      image: imageUrl,
      features:
        data.features?.map((feature) => ({
          name: feature.name,
          levels: feature.subCategories.map((sub) => sub.name),
          additionalPrices: feature.subCategories.map((sub) => sub.price),
        })) || [],
      available: 1,
      deleted: 0,
      discountStatus: '0',
      discountId: 'test',
      rating: 0,
    };

    try {
      updateFood(id, transformedData);
    } catch (error) {
      console.error('Error adding food item:', error);
    } finally {
      setTimeout(() => {
        showSwal();
        Navigate('/branch-manager/foods');
      }, 2000);
    }
  };

  // const [categories] = useState<Category[]>([
  //   { key: 'Non-Vegetarian', label: 'Non-Vegetarian' },
  //   { key: 'Vegetarian', label: 'Vegetarian' },
  //   { key: 'Other', label: 'Other' },
  // ]);

  // const fetchItems = async () => {
  //   try {
  //     const apiUrl = (import.meta as any).env.VITE_API_URL;
  //     const response = await fetch(`${apiUrl}/food/${id}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch item');
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching item:', error);
  //   }
  // };

  // const getItem = async () => {
  //   const item = await fetchItems();
  //   console.log('Item:', item);
  //   if (item) {
  //     setItem(item);
  //     setValue('name', item.name);
  //     setValue('category', item.category || []);
  //     setValue('description', item.description || '');
  //     setValue('price', item.price);
  //     setValue('image', item.image);
  //     if (item.features) {
  //       const features = item.features.map((feature: any) => ({
  //         name: feature.name,
  //         subCategories: feature.levels.map((level: any, idx: number) => ({
  //           name: level,
  //           price: feature.additionalPrices[idx],
  //         })),
  //       }));
  //       setValue('features', features);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getItem();
  // }, [id]);

  if (!item || !categories.length) {
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
            Edit Food Item
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 max-h-full"
        >
          <div className="w-full md:w-3/7 space-y-4 p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Item name</span>
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
                <span className="block mb-1 text-gray-600">Category</span>
                <MultiSelect
                  categories={categories}
                  register={register}
                  fieldname="category"
                  setValue={setValue}
                />
              </label>

              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Describe food</span>
                <textarea
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  placeholder="Tell us about your food..."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-600 mb-1">
                    {errors.description.message}
                  </p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Cost</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  step=".01"
                  {...register('cost')}
                  placeholder="Enter the production cost"
                />
                {errors.price && (
                  <p className="text-red-600">{errors.price.message}</p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Price</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  step="0.01"
                  {...register('price')}
                />
                {errors.price && (
                  <p className="text-red-600">{errors.price.message}</p>
                )}
              </label>
            </div>
            <Button
              type="button"
              className="flex w-full mb-3 justify-center rounded-lg border-solid border-2 border-[#ffffff] bg-blue-200 dark:bg-[#000000] p-3 font-medium text-black dark:text-white hover:bg-opacity-90 "
              onClick={() =>
                append({ name: '', subCategories: [{ name: '', price: 0 }] })
              }
            >
              Add Feature
            </Button>
            <div className="mt-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative mt-8 mb-4 border-dashed border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4"
                >
                  <button
                    type="button"
                    className="absolute top-1 mt-4 right-2 border-red-500 flex justify-center rounded-lg bg-red-500 dark:bg-red-800 p-2 font-medium text-white hover:bg-opacity-90"
                    onClick={() => remove(index)}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                  <label className="block">
                    <span className="block mt-8 mb-1 text-gray-600">
                      Feature Name
                    </span>
                    <input
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
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
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                          type="number"
                          step="0.01"
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
                        <TrashIcon className="h-7 w-7 text-red-500 dark:text-[#ffffff]" />
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    className="flex w-full mt-3 mb-3 justify-center rounded-lg border-2 border-solid text-black p-3 font-medium dark:text-white hover:bg-opacity-90"
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
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-4/7 flex p-6.5">
            <div className="w-full">
              <label className="block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Upload Image</span>
                <ImageInput
                  fieldname="image"
                  register={register}
                  setImageFile={setImageFile}
                  urlPreview={item.image}
                  height={'h-150'}
                />
              </label>
              <div className="flex justify-center gap-12 mt-16">
                <Button className="flex w-full justify-center rounded-lg bg-[#b1bfd0] text-white shadow-lg min-w-0 h-16">
                  Cancel
                </Button>
                <Button
                  className="flex w-full justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg min-w-0 h-16"
                  type="submit"
                >
                  Edit Food Item
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
