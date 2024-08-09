import { FC, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageInput from '@components/BranchManager/Inputs/ImageInput';
import { Button } from '@nextui-org/react';
import MultiSelect from '@components/BranchManager/Forms/MultiSelectSearch';
import { FoodCombo } from '@/types/combo';
import { useNavigate } from 'react-router-dom';
import { useUpload } from '@/api/useUpload';
import { useCombos } from '@/api/useCombos';
import { useFoods } from '@/api/useFoods';
import { Food } from '@/types/food';
import { swalSuccess } from '@/components/UI/SwalSuccess';

type ComboPicker = {
  key: string;
  label: string;
};

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Item name is required' }),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .multipleOf(0.01)
    .min(0, { message: 'Price must be at least 0' }),
  image: z.coerce
    .string({ message: 'Should be a string' })
    .optional()
    .default('test'),
  foodIds: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function ComboEditForm({ id = '' }: { id?: string }) {
  const { showSwal } = swalSuccess({
    message: 'Item Added successfully',
  });
  const Navigate = useNavigate();
  const { updateCombo } = useCombos();
  const { getComboById } = useCombos();
  const { uploadImage } = useUpload();
  const { getAllFoods } = useFoods();

  const [foods, setFoods] = useState<ComboPicker[]>([]);
  const [item, setItem] = useState<FoodCombo | null>(null);

  const { register, handleSubmit, formState, setValue } =
    useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema),
    });

  const { errors } = formState;

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log('Form errors:', errors);
    }
  }, [errors]);

  const getCombo = async () => {
    try {
      const data: FoodCombo = await getComboById(id);
      if (data) {
        setItem(data);
        setValue('name', data.name);
        setValue('description', data.description || '');
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('foodIds', data.foodIds);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCombo();
  }, [id]);

  const getFoods = async () => {
    try {
      const foods = await getAllFoods();
      if (foods) {
        const foodOptions = foods.map((food: Food) => ({
          key: food.id,
          label: food.name,
        }));
        setFoods(foodOptions);
      }
    } catch (error) {
      console.error('Error getting categories:', error);
    }
  };

  useEffect(() => {
    getFoods();
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

    const transformedData: FoodCombo = {
      cafeId: 'cafe 1',
      available: 0,
      deleted: 0,
      ...data,
      image: imageUrl,
    };

    try {
      updateCombo(id, transformedData);
    } catch (error) {
      console.error('Error adding food combo:', error);
    } finally {
      setTimeout(() => {
        showSwal();
        Navigate('/branch-manager/food-combos');
      }, 2000);
    }
  };

  if (!item || !foods.length) {
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
            Add Food Combos
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 max-h-full"
        >
          <div className="w-full md:w-3/7 space-y-4 p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Combo name</span>
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
                <span className="block mb-1 text-gray-600">
                  Describe food combo
                </span>
                <textarea
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  placeholder="Tell us about this combo ..."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-600 mb-1">
                    {errors.description.message}
                  </p>
                )}
              </label>
              <label className="mb-6 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Price</span>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
                  type="number"
                  {...register('price')}
                />
                {errors.price && (
                  <p className="text-red-600">{errors.price.message}</p>
                )}
              </label>
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Food items</span>
                <MultiSelect
                  categories={foods}
                  register={register}
                  fieldname="foodIds"
                  setValue={setValue}
                />
              </label>
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
                  Add Food Combo
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ComboEditForm;
