import { useEffect, useState } from 'react';
import Star from '../FoodItem/Star';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { useFoods } from '@/api/useFoods';
import { useCombos } from '@/api/useCombos';
import { useCategories } from '@/api/useCategories';
import { Food } from '@/types/food';
import { FoodCombo } from '@/types/combo';
import { Category } from '@/types/category';

function index() {
  const { getAllCategories } = useCategories();
  const [combos, setCombos] = useState<FoodCombo[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAllFoods } = useFoods();
  const { getAllCombos } = useCombos();

  const fetchFoods = async () => {
    try {
      const data = await getAllFoods();
      console.log(data);
      setFoods(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error: any) {
      console.error(error);
    }
  }

  const fetchCombos = async () => {
    try {
      const data = await getAllCombos();
      setCombos(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchCombos();
    fetchCategories();
  }, []);

  if (!foods) {
    return <div>Loading...</div>;
  }


  return (
    <div className="mx-auto max-w-screen-xl flex w-full flex-col">
      <Tabs aria-label="Options" variant="underlined">
        <Tab key="FoodItems" title="Food Items">
          <div>
            <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
              <b>Food Items</b>
            </div>
            <div className="mt-2 mx-auto max-w-screen px-4 2xl:px-0">
              Not ready to checkout? Continue Shopping
            </div>
          </div>
          {/* <Card>
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
                      <Link
                        to={`viewfood/${_.id}`}
                        className="hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                      >
                        <Button
                          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-3xl min-w-5"
                          style={{
                            position: 'relative',
                            left: '210px',
                            top: '45px',
                            zIndex: '1',
                          }}
                        >
                          <b>+</b>
                        </Button>
                        <div
                          className="dark:border rounded-2xl border-foodbg bg-foodbg  backdrop-blur-md w-55 h-850 p-2 py-2"
                          style={{
                            marginLeft: '10%',
                            marginRight: '10%',
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.01)',
                          }}
                        >
                          <div className="h-50">
                            <img src={_.image} alt="" className="w-[100%]" />
                          </div>

                          <div className="px-3 mt-2">
                            <b className="text-foodbg dark:text-white text-xl">
                              {_.name}
                            </b>

                            <div className="flex items-center pt-2">
                              {Array.from({ length: 5 }).map((j, i) => {
                                return (
                                  <Star key={`star-${i}`} highlight={i <= _.rating} />
                                );
                              })}
                            </div>

                            <div className="font-bold text-foodbg dark:text-white pt-2 text-xl">
                              <span className="pr-2 text-orange-500">Rs.</span>
                              {_.price}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card> */}

          <Tabs aria-label="Options" variant="underlined">
            {categories.map((category: any) => {
              return (
                <Tab key={category.id} title={category.name}>
                  <Card>
                    <CardBody>
                      {category.name}
                    </CardBody>
                  </Card>
                </Tab>
              );
            })}
          </Tabs>
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
                      <Link
                        to={`viewfood/${_.id}`}
                        className="hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                      >
                        <Button
                          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-3xl min-w-5"
                          style={{
                            position: 'relative',
                            left: '210px',
                            top: '45px',
                            zIndex: '1',
                          }}
                        >
                          <b>+</b>
                        </Button>
                        <div
                          className="dark:border rounded-2xl border-foodbg bg-foodbg  backdrop-blur-md w-55 h-850 p-2 py-2"
                          style={{
                            marginLeft: '10%',
                            marginRight: '10%',
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)',
                            backgroundColor: 'rgba(255, 255, 255, 0.01)',
                          }}
                        >
                          <div className="h-50">
                            <img src={_.image} alt="" className="w-[100%]" />
                          </div>

                          <div className="px-3 mt-2">
                            <b className="text-foodbg dark:text-white text-xl">
                              {_.name}
                            </b>

                            <div className="flex items-center pt-2">
                              {Array.from({ length: 5 }).map((_, i) => {
                                return (
                                  <Star key={`star-${i}`} highlight={i !== 4} />
                                );
                              })}
                            </div>

                            <div className="font-bold text-foodbg dark:text-white pt-2 text-xl">
                              <span className="pr-2 text-orange-500">Rs.</span>
                              {_.price}
                            </div>
                          </div>
                        </div>
                      </Link>
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
