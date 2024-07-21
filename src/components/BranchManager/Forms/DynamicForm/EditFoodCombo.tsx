import { FC, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageInput from '@components/BranchManager/Inputs/ImageInput';
import { Button } from '@nextui-org/react';
import MultiSelect from '@components/BranchManager/Forms/MultiCheckBox';
import { Combo } from '@/types/combo';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  foodIds: z.array(z.string()).optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function ComboEditForm({ id }: { id: string | undefined }) {
  const Navigate = useNavigate();
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

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    let imageUrl = data.image;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const uploadUrl = (import.meta as any).env.VITE_UPLOAD_URL;
        const response = await fetch(`${uploadUrl}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });

        if (response.ok) {
          const result = await response.json();
          imageUrl = result.fileUrl;
          setValue('image', imageUrl);
        } else {
          console.error('Image upload failed');
          return;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const transformedData = {
      cafeId: 'cafe 1',
      available: 0,
      deleted: 0,
      ...data,
      image: imageUrl,
      foodIds: [],
    };

    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/foodCombo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (response.ok) {
        toast('Food combo added successfully', { type: 'success' });
        Navigate('/branch-manager/food-combos');
      } else {
        toast('Failed to add food item', { type: 'error' });
        console.error('Failed to add food combo', response.statusText);
      }
    } catch (error) {
      console.error('Error adding food combo', error);
      toast('Failed to add food combo', { type: 'error' });
    }
  };

  const [foodIds] = useState<Combo[]>([
    { key: 'Pizza', label: 'Pizza' },
    { key: 'Milk-Shake', label: 'Milk-Shake' },
    { key: 'Other', label: 'Other' },
  ]);

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
                  categories={foodIds}
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
