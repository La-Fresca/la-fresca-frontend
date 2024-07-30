import { useState } from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';

interface Props {
  name: string;
  levels: string[];
  defaultPrice: number;
  prices: number[];
  setSelectedIndex: (index: number) => void;
  setPrice: (newPrice: number) => void;
}

export default function TextButtonGroup({
  name,
  levels,
  defaultPrice,
  prices,
  setSelectedIndex,
  setPrice,
}: Props) {
  const [localSelectedIndex, setLocalSelectedIndex] = useState<number | null>(
    null,
  );

  const handleIncrement = (index: number) => {
    setPrice(defaultPrice + prices[index]);
    setSelectedIndex(index);
    setLocalSelectedIndex(index);
  };

  return (
    <div className="flex mt-8">
      <div className="text-white mt-2">
        <b>{name}:</b>
      </div>
      <ButtonGroup className="ml-5">
        {levels.map((level, index) => {
          let buttonClass = 'border duration-300 hover:bg-foodbg';

          if (index === 0) {
            buttonClass += ' rounded-l-lg';
          } else if (index === levels.length - 1) {
            buttonClass += ' rounded-r-lg';
          }

          if (localSelectedIndex === index) {
            buttonClass += ' bg-foodbg text-white';
          }

          return (
            <Button
              key={index}
              className={buttonClass}
              onClick={() => handleIncrement(index)}
            >
              {level}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
