import { useEffect } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  description: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function CategoryEditForm({ id }: { id: string | undefined }) {
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
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast('Food item added successfully', { type: 'success' });
        Navigate('/branch-manager/foods');
      } else {
        toast('Failed to add food item', { type: 'error' });
        console.error('Failed to add food item:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      toast('Failed to add food item', { type: 'error' });
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
            Edit Food Categories
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 max-h-full"
        >
          <div className="w-full space-y-4 p-6.5">
            <div className="w-full">
              <label className="mb-3 block text-black dark:text-white">
                <span className="block mb-1 text-gray-600">Category name</span>
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
                  Describe food category
                </span>
                <textarea
                  className="w-full h-60 rounded border-[1.5px] border-stroke bg-transparent py-5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary text-start"
                  placeholder="Tell us about this food category..."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-600 mb-1">
                    {errors.description.message}
                  </p>
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
                  Edit Food Category
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryEditForm;
