import { useEffect, useState } from 'react';
import Food from '@images/product/pizza.png';
import Star from '../FoodItem/Star';

function index() {
  const TrendingFoods = [
    {
      name: 'Cheese Pizza',
      rating: 4,
      price: 3500,
    },
    {
      name: 'Saussage Pizza',
      rating: 5,
      price: 4500,
    },
    {
      name: 'Margherita Pizza',
      rating: 3,
      price: 3000,
    },
    {
      name: 'BBQ Chicken Pizza',
      rating: 3,
      price: 4000,
    },
    {
      name: 'Black Chicken Pizza',
      rating: 3,
      price: 4000,
    },
    {
      name: 'Hot & Spicy Chicken Pizza',
      rating: 3,
      price: 4000,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      {TrendingFoods.map((_, i) => {
        return (
          <a href="fooditems/viewfood">
            <div
              className="border rounded-2xl border-foodbg bg-foodbg  backdrop-blur-md w-55 h-850 p-2 py-2 hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
              style={{
                marginLeft: '10%',
                marginRight: '10%',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
              }}
            >
              <div>
                <img src={Food} alt="" className="w-[100%]" />
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
          </a>
        );
      })}
    </div>
  );
}

export default index;
