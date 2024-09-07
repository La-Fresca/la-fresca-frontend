import { Button } from '@nextui-org/react';

interface Props {
  count: number;
  setCount: (newCount: number) => void;
}

function QtySelector({ count, setCount }: Props) {
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-60">
      <div className="text-white mt-2">
        <b>Quantity:</b>
      </div>
      <div className="mt-3">
        <Button
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg min-w-0 h-8"
          onClick={handleDecrement}
        >
          <b>-</b>
        </Button>
        <input
          type="text"
          value={count}
          readOnly
          className="text-center w-16 ml-2 mr-2 py-1 bg-transparent border border-white text-white rounded-md"
        />
        <Button
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg min-w-0 h-8"
          onClick={handleIncrement}
        >
          <b>+</b>
        </Button>
      </div>
    </div>
  );
}

export default QtySelector;
