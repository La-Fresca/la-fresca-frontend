import { Button } from '@nextui-org/react';
import { useState } from 'react';

interface QtySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

function QtySelector({ quantity, onQuantityChange }: QtySelectorProps) {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-60 scale-75">
      <div className="mt-3">
        <Button
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg min-w-0 h-8 w-1"
          onClick={handleDecrement}
        >
          <b>-</b>
        </Button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="text-center w-16 ml-2 mr-2 py-1 bg-transparent border border-foodbg dark:text-white rounded-md"
        />
        <Button
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg min-w-0 h-8 w-1"
          onClick={handleIncrement}
        >
          <b>+</b>
        </Button>
      </div>
    </div>
  );
}

export default QtySelector;
