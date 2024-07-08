import { useEffect, useState } from 'react';
import Food from '@images/product/pizza.png';
import Star from './Star';

interface Props {
  id: String;
}

function index({id}: Props) {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(`https://localhost:8080/lafresca/food/${id}`);
    const items = await data.json();

    console.log(items);

    setItems(items);
  };

  return (
    <div className="flex items-center h-110vh md:h-[calc(100vh-120px)]">
      <div
        className="ml-[10%] flex flex-col md:flex-row flex-grow items-center justify-between px-4 py-4 rounded-2xl border border-foodbg bg-foodbg  backdrop-blur-md"
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div>
          <img src={Food} alt="" />
        </div>
        <div className="">
          <div className="text-4xl font-bold text-white ">Cheese Pizza</div>
          <div className="pt-3">
            A delicious sandwich with a juicy patty, fresh bun, and customizable
            toppings like lettuce, tomato, cheese, and sauces.
          </div>
          <div>
            <div className="flex items-center pt-3">
              {Array.from({ length: 5 }).map((_, i) => {
                return <Star key={`star-${i}`} highlight={i !== 4} />;
              })}
            </div>
            <div className="font-bold text-white pt-5">
              <span className="pr-2 text-orange-500">Rs.</span>3500.00
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
