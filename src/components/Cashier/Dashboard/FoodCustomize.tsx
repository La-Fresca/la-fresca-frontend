import { useEffect, useState } from 'react';
import Star from '@components/User/FoodItem/Star';

import TextButtonGroup from '@components/User/FoodItem/TextButtonGroup';
import TextButton from '@components/User/FoodItem/TextButton';

import QtySelector from '@components/User/FoodItem/QtySelector';
import { Food } from '@/types/food';
import { useFoods } from '@/api/useFoods';

interface Props {
  id: string | undefined;
}

function index({ id }: Props) {
  const { getFoodById } = useFoods();
  const [food, setFood] = useState<Food>();
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);

  const fetchFood = async () => {
    try {
      const food = await getFoodById(id?.toString() || '');
      setFood(food);
      console.log(food);
      console.log(food.price);
      setPrice(food.price);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  if (!food) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="flex items-center h-50vh w-200">
      <div
        className="flex lg:flex-row  items-center justify-between px-4 py-4 rounded-2xl border border-foodbg bg-foodbg  backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div>
          <img src={food.image} alt="" className="w-[100%]" />
        </div>

        <div className="w-[60%]">
          <div className="text-4xl font-bold text-white ">{food.name}</div>
          <div className="pt-3">{food.description}</div>

          <div className="flex items-center pt-3">
            {Array.from({ length: 5 }).map((_, i) => {
              return <Star key={`star-${i}`} highlight={i !== 4} />;
            })}
          </div>

          <div className="font-bold text-white pt-5 text-2xl">
            <span className="pr-2 text-orange-500">Rs.</span>
            {price * count}
          </div>

          <div>
            <QtySelector count={count} setCount={setCount} />

            <div className="mt-8">
              {food.features.map((feature: any, index: number) => (
                <TextButtonGroup
                  key={index}
                  name={feature.name}
                  levels={feature.levels}
                  prices={feature.additionalPrices}
                  defaultPrice={food.price}
                  setPrice={setPrice}
                />
              ))}
            </div>

            <div className="flex justify-between items-center w-80 md:w-90 mt-2">

              <TextButton value="Buy Now" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
