import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Food from '../../../assets/food.jpg';

function index() {
  const [item, setItem] = useState<any>(null); // Adjusted initial state to null

  const fetchItems = async () => {
    try {
      let apiUrl = (import.meta as any).env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/discount`);
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
  
  // const item = [
  //   {
  //     id: '01',
  //     name: 'Cheese Pizza',
  //     branch: 'Panadura',
  //     rating: 4,
  //     price: 3500,
  //   },
  //   {
  //     id: '02',
  //     name: 'Saussage Pizza',
  //     branch: 'Bambalapitiya',
  //     rating: 5,
  //     price: 4500,
  //   },
  //   {
  //     id: '03',
  //     name: 'Margherita Pizza',
  //     branch: 'Nugegoda',
  //     rating: 3,
  //     price: 3000,
  //   },
  //   {
  //     id: '04',
  //     name: 'BBQ Chicken Pizza',
  //     branch: 'Dehiwala',
  //     rating: 3,
  //     price: 4000,
  //   },
  //   {
  //     id: '04',
  //     name: 'BBQ Chicken Pizza',
  //     branch: 'Kalutara',
  //     rating: 3,
  //     price: 4000,
  //   }
  // ];
  return (
    <div>
      <div className="text-4xl text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Promotions</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Not ready to checkout? Continue Shopping
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto max-w-screen-xl mt-10">
        {item.map((_: any) => {
          return (
            <Link
              to={`viewfood/${_.id}`}
              className="hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
            >
              <div
                className="border rounded-2xl border-foodbg bg-foodbg  backdrop-blur-md w-55 h-850 p-2 py-2"
                style={{
                  marginLeft: '10%',
                  marginRight: '10%',
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                }}
              >

                <div className="h-50 bg-white">
                  <img src={_.image} alt="" className="w-[100%]" />
                </div>

                <div className="px-3 mt-2">
                  <p><b className="text-white text-xl">{_.name}</b></p>
                  <p>{_.branch}</p>

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
    </div>
  );
}

export default index;
