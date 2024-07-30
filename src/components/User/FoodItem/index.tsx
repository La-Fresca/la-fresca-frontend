import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, menu, user } from '@nextui-org/react';
import { useFoods } from '@/api/useFoods';
import { useCart } from '@/api/useCart';
import { Food } from '@/types/food';
import Star from './Star';
import TextButtonGroup from './TextButtonGroup';
import TextButton from './TextButton';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Cart } from '@/types/cart';
import { useNavigate } from 'react-router-dom';
import { swalSuccess } from '@/components/UI/SwalSuccess';
import { delay } from 'framer-motion';

interface Props {
  id: string | undefined;
}

const FormSchema = z.object({
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  customFeatures: z.array(
    z.object({
      name: z.string(),
      level: z.number().nullable(),
    }),
  ),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function FoodForm({ id }: Props) {
  const { showSwal } = swalSuccess({
    message: 'Item Added to cart successfully',
  });
  const navigate = useNavigate();
  const userId = (useAuthUser() as { userId: string }).userId;
  const { getFoodById } = useFoods();
  const { addCartItem } = useCart();
  const [food, setFood] = useState<Food>();
  const [price, setPrice] = useState<number>(1);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: 1,
      customFeatures: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'customFeatures',
  });

  const fetchFood = async () => {
    try {
      const food = await getFoodById(id?.toString() || '');
      setFood(food);
      setPrice(food.price);
      setValue(
        'customFeatures',
        food.features.map((feature: any) => ({
          name: feature.name,
          level: -1,
        })),
      );
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const transformedData: Cart = {
      ...data,
      userId: userId,
      menuItemId: food?.id,
      menuItemType: 'Food Item',
      customFeatures: data.customFeatures.map((feature) => ({
        ...feature,
        level: feature.level || 0,
      })),
    };
    try {
      addCartItem(transformedData);
    } catch (error) {
      console.error('Error adding food item:', error);
    } finally {
      setTimeout(() => {
        showSwal();
        navigate('/cart');
      }, 2000);
    }
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center h-110vh lg:h-[calc(100vh-120px)]">
      <div
        className="ml-[10%] flex flex-col lg:flex-row flex-grow items-center justify-between px-4 py-4 rounded-2xl border border-foodbg bg-foodbg backdrop-blur-md"
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div>
          <img src={food.image} alt="" className="w-[100%]" />
        </div>

        <div className="w-[70%]">
          <div className="text-4xl font-bold text-white">{food.name}</div>
          <div className="pt-3">{food.description}</div>

          <div className="flex items-center pt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={`star-${i}`} highlight={i !== 4} />
            ))}
          </div>

          <div className="font-bold text-white pt-5 text-2xl">
            <span className="pr-2 text-orange-500">Rs.</span>
            {price * (watch('quantity') || 1)}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="flex items-center justify-between w-60">
              <div className="text-white mt-2">
                <b>Quantity:</b>
              </div>
              <div className="mt-3">
                <Button
                  className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg min-w-0 h-8"
                  onClick={() =>
                    setValue(
                      'quantity',
                      Math.max((watch('quantity') || 1) - 1, 1),
                    )
                  }
                >
                  <b>-</b>
                </Button>
                <input
                  type="text"
                  value={watch('quantity') || 1}
                  readOnly
                  className="text-center w-16 ml-2 mr-2 py-1 bg-transparent border border-white text-white rounded-md"
                  {...register('quantity')}
                />
                <Button
                  className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg min-w-0 h-8"
                  onClick={() =>
                    setValue('quantity', (watch('quantity') || 1) + 1)
                  }
                >
                  <b>+</b>
                </Button>
              </div>
            </div>

            <div className="mt-8">
              {fields.map((field, index) => (
                <TextButtonGroup
                  key={field.id}
                  name={field.name}
                  levels={food.features[index].levels}
                  prices={food.features[index].additionalPrices}
                  defaultPrice={food.price}
                  setSelectedIndex={(level) => {
                    setValue(`customFeatures.${index}.level`, level);
                  }}
                  setPrice={(newPrice) => {
                    setPrice(newPrice);
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between items-center w-80 md:w-90 mt-2">
              <Button
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 mt-8 px-10"
                type="submit"
              >
                Add to Cart
              </Button>
              <TextButton value="Buy Now" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoodForm;
