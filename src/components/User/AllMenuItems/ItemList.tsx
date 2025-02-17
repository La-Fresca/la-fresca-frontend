import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Star from '../FoodItem/Star';
import { useState } from 'react';
import { swalSuccess } from '@/components/UI/SwalSuccess';

interface Props {
  id?: string;
  name: string;
  rating: number;
  price: number;
  image: string;
  categories?: string[];
  discountStatus?: string;
  available?: number;
  type: string;
}

export default function ItemList({
  id,
  name,
  rating, // we'll ignore this prop
  image,
  price,
  discountStatus,
  categories,
  available,
  type,
}: Props) {
  const [currentRating, setCurrentRating] = useState(
    id
      ? id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2 ===
        0
        ? 4
        : 5
      : 5,
  );

  const { showSwal } = swalSuccess({
    message: 'Rating saved successfully',
  });

  const handleStarClick = (starIndex: number) => {
    // Prevent navigation when clicking stars
    event?.preventDefault();
    event?.stopPropagation();
    setCurrentRating(starIndex + 1);
    showSwal();
  };

  return (
    <Link
      to={
        type === 'fooditem'
          ? `viewfooditem/${id}`
          : type === 'foodcombo'
            ? `viewfoodcombo/${id}`
            : ''
      }
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

        {available == 0 ? (
          <div className="absolute p-2 w-[120px] h-2 rotate-[135deg] bg-gradient-to-t from-red-600 to-red-900 translate-x-[-35px] translate-y-[20px]">
            <p className="rotate-180 text-xs translate-y-[-7.5px] translate-x-[-15px] text-white">
              UNAVAILABLE
            </p>
          </div>
        ) : discountStatus == '1' ? (
          <div className="absolute p-2 w-[120px] h-2 rotate-[135deg] bg-gradient-to-t from-red-600 to-red-900 translate-x-[-35px] translate-y-[20px]">
            <p className="rotate-180 text-xs translate-y-[-7.5px] translate-x-[-15px] text-white">
              PROMOTION
            </p>
          </div>
        ) : null}

        <div className="h-50 rounded-xl">
          <img src={image} alt="" className="w-[100%] h-[200px] rounded-xl" />
        </div>

        <div className="px-3 mt-2">
          <div className="h-[50px]">
            <b className="text-foodbg dark:text-white text-xl">{name}</b>
          </div>

          <div className="flex items-center pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="cursor-pointer transform scale-125 mx-1"
                onClick={(e) => handleStarClick(i)}
              >
                <Star highlight={i <= currentRating - 1} />
              </div>
            ))}
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
