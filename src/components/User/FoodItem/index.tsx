import { useEffect, useState } from 'react';
import Food from '@images/product/pizza.png';
import Star from './Star';

import TextButtonGroup from './TextButtonGroup';
import TextButton from './TextButton';

import QtySelector from './QtySelector';

interface Props {
  id: string | undefined;
}

function index({ id }: Props) {
  const [item, setItem] = useState<any>(null);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lafresca/food/${id}`,
      );
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
  }, [id]);

  if (!item) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="flex items-center h-110vh lg:h-[calc(100vh-120px)]">
      <div
        className="ml-[10%] flex flex-col lg:flex-row flex-grow items-center justify-between px-4 py-4 rounded-2xl border border-foodbg bg-foodbg  backdrop-blur-md"
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div>
          <img src={Food} alt="" className="w-[100%]" />
        </div>

        <div className="w-[70%]">
          <div className="text-4xl font-bold text-white ">{item.name}</div>
          <div className="pt-3">{item.description}</div>

          <div className="flex items-center pt-3">
            {Array.from({ length: 5 }).map((_, i) => {
              return <Star key={`star-${i}`} highlight={i !== 4} />;
            })}
          </div>

          <div className="font-bold text-white pt-5 text-2xl">
            <span className="pr-2 text-orange-500">Rs.</span>
            {item.price}
          </div>

          <div>
            <QtySelector />

            <div className="mt-8">
              {item.features.map((feature: any, index: number) => (
                <TextButtonGroup
                  key={index}
                  name={feature.name}
                  levels={feature.levels}
                />
              ))}
            </div>

            <div className="flex justify-between items-center w-80 md:w-90 mt-2">
              <TextButton value="Add to Cart" />
              <TextButton value="Buy Now" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
