import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { useFoods } from '@/api/useFoodItem';
import { useCombos } from '@/api/useFoodCombo';
import { useCategories } from '@/api/useCategory';
import { Food } from '@/types/food';
import { FoodCombo } from '@/types/combo';
import { useQuery } from '@tanstack/react-query';
import Item from './ItemList';
import { Category } from '@/types/category';

function index() {
  const { getAllFoods } = useFoods();
  const { getAllCombos } = useCombos();
  const { getAllCategories } = useCategories();

  const foodQuery = useQuery({
    queryKey: ['foods'],
    queryFn: getAllFoods,
  });

  const comboQuery = useQuery({
    queryKey: ['combos'],
    queryFn: getAllCombos,
  });

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  if (foodQuery.isLoading || comboQuery.isLoading || categoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (foodQuery.isError) {
    return <div>Error: {JSON.stringify(foodQuery.error)}</div>;
  }

  if (comboQuery.isError) {
    return <div>Error: {JSON.stringify(comboQuery.error)}</div>;
  }

  if (categoryQuery.isError) {
    return <div>Error: {JSON.stringify(categoryQuery.error)}</div>;
  }

  const foods: Food[] = foodQuery.data;
  const combos: FoodCombo[] = comboQuery.data;
  const categoriesObject: Category[] = categoryQuery.data;

  console.log(foods);

  const categories = ['Burger', 'Pizza', 'Coffee', 'Tea'];

  return (
    <div className="mx-auto max-w-screen-xl flex w-full flex-col">
      <Tabs
        aria-label="Options"
        variant="underlined"
        color={'warning'}
        radius="full"
      >
        <Tab key="FoodItems" title="Food Items">
          <Card>
            <CardBody>
              <div>
                <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
                  <b>Food Items</b>
                </div>
                <div className="mt-2 mx-auto max-w-screen px-4 2xl:px-0">
                  Deliciously crafted meals and treats to complement every coffee moment.
                </div>

                <Tabs
                  aria-label="Options"
                  variant="solid"
                  color={'warning'}
                  radius="full"
                  size="lg"
                  className="pt-6 dark:text-white text-foodbg"
                >
                  <Tab key="All" title="All">
                    <Card>
                      <CardBody>
                        <div>
                          <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-5">
                            {foods.map((_: Food) => {
                              return (
                                <Item
                                  id={_.id}
                                  name={_.name}
                                  rating={_.rating}
                                  price={_.price}
                                  image={_.image}
                                  categories={_.categories}
                                  discountStatus={_.discountStatus}
                                  available={_.available}
                                  type={'fooditem'}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>

                  {categories.map((category) => {
                    return (
                      <Tab key={category} title={category}>
                        <Card>
                          <CardBody>
                            <div>
                              <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-5">
                                {foods.map((_: Food) => {
                                  if (_.categories.includes(category)) {
                                    return (
                                      <Item
                                        key={_.id}
                                        id={_.id}
                                        name={_.name}
                                        rating={_.rating}
                                        price={_.price}
                                        image={_.image}
                                        categories={_.categories}
                                        discountStatus={_.discountStatus}
                                        available={_.available}
                                        type={'fooditem'}
                                      />
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                    );
                  })}
                </Tabs>
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
                  Perfectly paired meals created for maximum flavor and satisfaction.
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
                        available={_.available}
                        type={'foodcombo'}
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
