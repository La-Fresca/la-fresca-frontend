import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useFoods } from '@/api/useFoodItem';
import { useCart } from '@/api/useCart';
import { useOrders } from '@/api/useOrder';
import { Food } from '@/types/food';
import Star from './Star';
import TextButtonGroup from './TextButtonGroup';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Cart } from '@/types/cart';
import { Order } from '@/types/order';
import { OrderItem } from '@/types/order';
import { useNavigate } from 'react-router-dom';
import { swalSuccess } from '@/components/UI/SwalSuccess';
import QtySelector from './QtySelector';

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
  const { createOrder } = useOrders();
  const [food, setFood] = useState<Food>();
  const [basePrice, setBasePrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [additionalPrices, setAdditionalPrices] = useState<number>(0);

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

  console.log(errors);

  const { fields, append } = useFieldArray({
    control,
    name: 'customFeatures',
  });

  const fetchFood = async () => {
    try {
      const food = await getFoodById(id?.toString() || '');
      setFood(food);
      setBasePrice(food.price);
      setTotalPrice(food.price);
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

  useEffect(() => {
    const quantity = watch('quantity') || 1;
    setTotalPrice((basePrice + additionalPrices) * quantity);
  }, [watch('quantity'), additionalPrices, basePrice]);

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

  const onBuyNow = async (data: FormSchemaType) => {
    const orderItem: OrderItem = {
      foodId: food?.id || '',
      name: food?.name || '',
      price: basePrice,
      image: food?.image || '',
      quantity: data.quantity,
      totalPrice: totalPrice,
      orderStatus: 'PENDING',
      addedFeatures: data.customFeatures.map((feature) => ({
        name: feature.name,
        level: feature.level?.toString() || '0',
        additionalPrice:
          food?.features.find((f) => f.name === feature.name)?.additionalPrices[
            feature.level || 0
          ] || 0,
      })),
    };

    const orderData: Order = {
      orderType: 'ONLINE',
      totalAmount: totalPrice,
      orderStatus: 'PENDING',
      cafeId: food?.cafeId || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      orderItems: [orderItem],
      customerId: userId,
    };

    navigate('/checkout', { state: { orderData } });
  };

  const adjustAdditionalPrice = (priceDelta: number) => {
    setAdditionalPrices((prev) => prev + priceDelta);
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center h-110vh lg:h-[calc(100vh-120px)]">
      <div
        className="ml-[10%] flex flex-col lg:flex-row flex-grow items-center justify-between px-4 py-4 rounded-2xl border border-foodbg bg-foodbg backdrop-blur-md h-[calc(100vh - 20px)]"
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div className="w-[50%] h-[100%] p-10">
          <img
            src={food.image}
            alt=""
            className="w-[100%] h-[100%] rounded-xl"
          />
        </div>

        <div className="w-[50%]">
          <div className="text-4xl font-bold text-white">{food.name}</div>
          <div className="pt-3">{food.description}</div>

          <div className="flex items-center pt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={`star-${i}`} highlight={i !== 4} />
            ))}
          </div>

          <div className="font-bold text-white pt-5 text-2xl">
            <span className="pr-2 text-orange-500">Rs.</span>
            {totalPrice}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <QtySelector
              count={watch('quantity') || 1}
              setCount={(newCount) => setValue('quantity', newCount)}
            />

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
                  adjustPrice={adjustAdditionalPrice}
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
              <Button
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 mt-8 px-10"
                onClick={() => handleSubmit(onBuyNow)()}
              >
                Buy Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoodForm;
