import { useEffect, useState } from 'react';
import Food from '@images/product/pizza.png';
import Star from '../FoodItem/Star';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function index() {
  const [item, setItem] = useState<any>(null); // Adjusted initial state to null

  const fetchItems = async () => {
    try {
      let apiUrl = (import.meta as any).env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/food`);
      if (!response.ok) {
        throw new Error('Failed to fetch item');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const getItem = async () => {
    const item = await fetchItems();
    setItem(item);
    console.log(item);
  };

  useEffect(() => {
    getItem();
  }, []);

  if (!item) {
    return <div>Loading...</div>;
  }

  // const TrendingFoods = [
  //   {
  //     id: '01',
  //     name: 'Cheese Pizza',
  //     rating: 4,
  //     price: 3500,
  //   },
  //   {
  //     id: '02',
  //     name: 'Saussage Pizza',
  //     rating: 5,
  //     price: 4500,
  //   },
  //   {
  //     id: '03',
  //     name: 'Margherita Pizza',
  //     rating: 3,
  //     price: 3000,
  //   },
  //   {
  //     id: '04',
  //     name: 'BBQ Chicken Pizza',
  //     rating: 3,
  //     price: 4000,
  //   },
  //   {
  //     id: '05',
  //     name: 'Black Chicken Pizza',
  //     rating: 3,
  //     price: 4000,
  //   },
  //   {
  //     id: '06',
  //     name: 'Hot & Spicy Chicken Pizza',
  //     rating: 3,
  //     price: 4000,
  //   },
  // ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      {item.map((_: any) => {
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
              className="border rounded-2xl border-foodbg bg-foodbg  backdrop-blur-md w-55 h-850 p-2 py-2"
              style={{
                marginLeft: '10%',
                marginRight: '10%',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
              }}
            >
              <div>
                <img src={_.image} alt="" className="w-[100%]" />
              </div>

              <div className="px-3 mt-2">
                <b className="text-white text-xl">{_.name}</b>

                <div className="flex items-center pt-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    return <Star key={`star-${i}`} highlight={i !== 4} />;
                  })}
                </div>

                <div className="font-bold text-white pt-2 text-xl">
                  <span className="pr-2 text-orange-500">Rs.</span>
                  {_.price}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default index;
