import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Food from '../../../assets/food.jpg';
import TextButton from './TextButton';

function index() {
  // const [item, setItem] = useState<any>(null); // Adjusted initial state to null

  // const fetchItems = async () => {
  //   try {
  //     let apiUrl = (import.meta as any).env.VITE_API_URL;
  //     const response = await fetch(`${apiUrl}/discount`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch item');
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching item:', error);
  //   }
  // };

  // const getItem = async () => {
  //   const item = await fetchItems();
  //   setItem(item);
  //   console.log(item);
  // };

  // useEffect(() => {
  //   getItem();
  // }, []);

  // if (!item) {
  //   return <div>Loading...</div>;
  // }

  const item = [
    {
      id: '01',
      name: 'Cheese Pizza',
      branch: 'Panadura',
      rating: 4,
      price: 3500,
      limited: 1,
    },
    {
      id: '02',
      name: 'Saussage Pizza',
      branch: 'Bambalapitiya',
      rating: 5,
      price: 4500,
      limited: 0,
    },
    {
      id: '03',
      name: 'Margherita Pizza',
      branch: 'Nugegoda',
      rating: 3,
      price: 3000,
      limited: 1,
    },
    {
      id: '04',
      name: 'BBQ Chicken Pizza',
      branch: 'Dehiwala',
      rating: 3,
      price: 4000,
      limited: 1,
    },
    {
      id: '04',
      name: 'BBQ Chicken Pizza',
      branch: 'Kalutara',
      rating: 3,
      price: 4000,
      limited: 1,
    },
  ];
  return (
    <div>
      <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Promotions</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Enjoy great savings with exclusive deals and offers available on your
        favorite items.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mx-auto max-w-screen-xl mt-10">
        {item.map((_: any) => {
          return (
            <Link
              to={`viewfood/${_.id}`}
              className="hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
            >
              <div
                className="dark:border rounded-2xl border-foodbg bg-foodbg backdrop-blur-md xl:w-[500px] lg:w-[450px] h-[280px] p-2 py-2 mx-[10%] mb-10 overflow-hidden"
                style={{
                  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)',
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                }}
              >
                {_.limited === 1 && (
                  <div className="absolute p-2 w-[120px] h-2 rotate-[135deg] bg-gradient-to-r from-red-600 to-red-800 translate-x-[-35px] translate-y-[20px]">
                    <p className="rotate-180 text-xs translate-y-[-7.5px] translate-x-[-15px] text-white">
                      LIMITED TIME
                    </p>
                  </div>
                )}

                <div className="h-50 bg-green rounded-xl">
                  <img src={_.image} alt="" className="w-[100%]" />
                </div>

                <div className="flex justify-between px-3 mt-2">
                  <div className="">
                    <p>
                      <b className="dark:text-white text-foodbg text-xl">
                        {_.name}
                      </b>
                    </p>
                    <p>{_.branch}</p>
                  </div>

                  <div className="pt-[7px] pb-[3px]">
                    <TextButton value="Buy Now" />
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
