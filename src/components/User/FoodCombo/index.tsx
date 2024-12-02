import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useCombos } from '@/api/useFoodCombo';
import { useCart } from '@/api/useCart';
import { FoodCombo } from '@/types/combo';
import Star from './Star';
import TextButton from './TextButton';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Cart } from '@/types/cart';
import { useNavigate } from 'react-router-dom';
import { swalSuccess } from '@/components/UI/SwalSuccess';
import QtySelector from './QtySelector';
import { Order, OrderItem } from '@/types/order';

interface Props {
  id: string | undefined;
}

const FormSchema = z.object({
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function FoodComboForm({ id }: Props) {
  const { showSwal } = swalSuccess({
    message: 'Item Added to cart successfully',
  });
  const navigate = useNavigate();
  const userId = (useAuthUser() as { userId: string }).userId;
  const { getComboById } = useCombos();
  const { addCartItem } = useCart();
  const [combo, setFoodCombo] = useState<FoodCombo>();
  const [price, setPrice] = useState<number>(1);
  const [additionalPrices, setAdditionalPrices] = useState<number>(0);

  const {
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const fetchFoodCombo = async () => {
    try {
      console.log('fetching id:', id);
      const combo = await getComboById(id || '');
      setFoodCombo(combo);
      setPrice(combo.price);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    fetchFoodCombo();
  }, [id]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const transformedData: Cart = {
      ...data,
      userId: userId,
      menuItemId: combo?.id,
      menuItemType: 'Food Combo',
      customFeatures: [],
    };
    try {
      addCartItem(transformedData);
    } catch (error) {
      console.error('Error adding combo item:', error);
    } finally {
      setTimeout(() => {
        showSwal();
        navigate('/cart');
      }, 2000);
    }
  };

  const onBuyNow = async (data: FormSchemaType) => {
    const orderItem: OrderItem = {
      menuItemType: 'Food Combo',
      foodId: combo?.id || '',
      name: combo?.name || '',
      price: price,
      image: combo?.image || '',
      quantity: data.quantity,
      totalPrice: price * data.quantity,
      orderStatus: 'PENDING',
      addedFeatures: [],
    };

    const orderData: Order = {
      orderType: 'ONLINE',
      totalAmount: price * data.quantity,
      orderStatus: 'PENDING',
      cafeId: combo?.cafeId || '',
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

  if (!combo) {
    return <div>Loading...</div>;
  }

  console.log(combo);

  return (
    <div className="flex items-center h-110vh lg:h-[calc(100vh-120px)]">
      <div
        className="ml-[10%] flex flex-col lg:flex-row flex-grow items-center justify-between px-4 py-4 rounded-2xl border border-combobg bg-combobg backdrop-blur-md h-[calc(100vh - 20px)]"
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div className="w-[50%] h-[100%] p-10">
          <img
            src={combo.image}
            alt=""
            className="w-[100%] h-[100%] rounded-xl"
          />
        </div>

        <div className="w-[50%]">
          <div className="text-4xl font-bold text-white">{combo.name}</div>
          <div className="pt-3">{combo.description}</div>

          <div className="flex items-center pt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={`star-${i}`} highlight={i !== 4} />
            ))}
          </div>

          <div className="font-bold text-white pt-5 text-2xl">
            <span className="pr-2 text-orange-500">Rs.</span>
            {price * (watch('quantity') || 1) + additionalPrices}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <QtySelector
              count={watch('quantity') || 1}
              setCount={(newCount) => setValue('quantity', newCount)}
            />

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

export default FoodComboForm;
