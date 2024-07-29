import { Button } from '@nextui-org/react';
import { useState } from 'react';

interface QtySelectorProps {
  quantity: number;
}

const QtySelector: React.FC<QtySelectorProps> = ({ quantity }) => {
  const [count, setCount] = useState<number>(quantity);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      if (prevCount > 1) {
        return prevCount - 1;
      }
      return prevCount; // No change if count is already 1 or less
    });
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
          value={count}
          readOnly
          className="text-center w-16 ml-2 mr-2 py-1 bg-transparent border border-foodbg text-white rounded-md"
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
};

export default QtySelector;
