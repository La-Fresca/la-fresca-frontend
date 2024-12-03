import { useQuery } from '@tanstack/react-query';
import { useFoods } from '@/api/useFoodItem';
import { useCombos } from '@/api/useFoodCombo';
import { Food } from '@/types/food';
import { FoodCombo } from '@/types/combo';
import Item from '../AllMenuItems/ItemList';

function index() {
  const { getAllFoods } = useFoods();
  const { getAllCombos } = useCombos();

  const foodQuery = useQuery({
    queryKey: ['foods'],
    queryFn: getAllFoods,
  });

  const comboQuery = useQuery({
    queryKey: ['combos'],
    queryFn: getAllCombos,
  });

  if (foodQuery.isLoading || comboQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (foodQuery.isError || comboQuery.isError) {
    return <div>Error loading items</div>;
  }

  const foods: Food[] = foodQuery.data.filter(
    (food: Food) => food.discountStatus,
  );
  const combos: FoodCombo[] = comboQuery.data.filter(
    (combo: FoodCombo) => combo.discountStatus,
  );

  return (
    <div>
      <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Promotions</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Enjoy great savings with exclusive deals and offers available on your
        favorite items.
      </div>

      <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 mt-10">
        {foods.map((food: Food) => (
          <Item
            key={food.id}
            id={food.id}
            name={food.name}
            rating={food.rating}
            price={food.price}
            image={food.image}
            categories={food.categories}
            discountStatus={food.discountStatus}
            available={food.available}
            type={'fooditem'}
          />
        ))}
        {combos.map((combo: FoodCombo) => (
          <Item
            key={combo.id}
            id={combo.id}
            name={combo.name}
            rating={combo.rating}
            price={combo.price}
            image={combo.image}
            discountStatus={combo.discountStatus}
            available={combo.available}
            type={'foodcombo'}
          />
        ))}
      </div>
    </div>
  );
}

export default index;
