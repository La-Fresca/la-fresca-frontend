import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Star from '../FoodItem/Star';

interface Props {
  id?: string;
  name: string;
  rating: number;
  price: number;
  image: string;
  discountStatus?: string;
}

export default function ItemList({ id, name, rating, image, price, discountStatus }: Props) {
  return (
    <Link
      to={`viewfood/${id}`}
      className="hover:scale-105 transition-transform duration-300 hover:cursor-pointer mx-[10%] mt-[50px]"
    >
      <div
        className="dark:border rounded-2xl border-foodbg bg-foodbg  backdrop-blur-md w-55 h-850 p-2 py-2 overflow-hidden"
        style={{
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <Button
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-full min-w-5"
          style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            zIndex: '1',
          }}
        >
          <b>+</b>
        </Button>

        {discountStatus == '1' && (
          <div className="absolute p-2 w-[120px] h-2 rotate-[135deg] bg-gradient-to-t from-red-600 to-red-900 translate-x-[-35px] translate-y-[20px]">
            <p className="rotate-180 text-xs translate-y-[-7.5px] translate-x-[-15px] text-white">
              PROMOTION
            </p>
          </div>
        )}

        <div className="h-50 rounded-xl">
          <img src={image} alt="" className="w-[100%] h-[200px] rounded-2xl" />
        </div>

        <div className="px-3 mt-2">
          <div className="h-[50px]">
            <b className="text-foodbg dark:text-white text-xl">{name}</b>
          </div>

          <div className="flex items-center pt-2">
            {Array.from({ length: 5 }).map((j, i) => {
              return <Star key={`star-${i}`} highlight={i <= rating} />;
            })}
          </div>

          <div className="font-bold text-foodbg dark:text-white pt-2 text-xl">
            <span className="pr-2 text-orange-500">Rs.</span>
            {price}
          </div>
        </div>
      </div>
    </Link>
  );
}
