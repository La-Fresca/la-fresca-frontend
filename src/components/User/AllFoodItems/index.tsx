import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useFoods } from '@/api/useFoods';
import { useCombos } from '@/api/useCombos';
import { Food } from '@/types/food';
import { FoodCombo } from '@/types/combo';
import { useQuery, useMutation } from '@tanstack/react-query';
import Item from './itemList';

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

  if (foodQuery.isError) {
    return <div>Error: {JSON.stringify(foodQuery.error)}</div>;
  }

  if (comboQuery.isError) {
    return <div>Error: {JSON.stringify(comboQuery.error)}</div>;
  }

  const foods: Food[] = foodQuery.data;
  const combos: FoodCombo[] = comboQuery.data;

  return (
    <div className="mx-auto max-w-screen-xl flex w-full flex-col">
      <Tabs aria-label="Options" variant="underlined">
        <Tab key="FoodItems" title="Food Items">
          <Card>
            <CardBody>
              <div>
                <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
                  <b>Food Items</b>
                </div>
                <div className="mt-2 mx-auto max-w-screen px-4 2xl:px-0">
                  Not ready to checkout? Continue Shopping
                </div>

                <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-5">
                  {foods.map((_: Food) => {
                    return (
                      <Item
                        id={_.id}
                        name={_.name}
                        rating={_.rating}
                        price={_.price}
                        image={_.image}
                        discountStatus={_.discountStatus}
                      />
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="FoodCombos" title="Food Combos">
          <Card>
            <CardBody>
              <div>
                <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
                  <b>Food Combos</b>
                </div>
                <div className="mt-2 mx-auto max-w-screen px-4 2xl:px-0">
                  Not ready to checkout? Continue Shopping
                </div>

                <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-5">
                  {combos.map((_: FoodCombo) => {
                    return (
                      <Item
                        id={_.id}
                        name={_.name}
                        rating={_.rating}
                        price={_.price}
                        image={_.image}
                        discountStatus={_.discountStatus}
                      />
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default index;
