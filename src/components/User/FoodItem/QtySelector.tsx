import {Button} from "@nextui-org/react";
import { useState } from 'react';

function QtySelector() {
    const [count, setCount] = useState<number>(1);

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount(prevCount => {
            if (prevCount > 1) {
            return prevCount - 1;
            }
            return prevCount; // No change if count is already 1 or less
        });
    };

    return (
        <div className="flex items-center justify-between w-80">
            <div className='text-white mt-2'>
                <b>Quantity:</b>
            </div>
            <div className="mt-3">
                <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg w-7 h-8"
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
                <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg w-7 h-8"
                    onClick={handleIncrement}
                >
                    <b>+</b>
                </Button>
            </div>
        </div>
    )
}

export default QtySelector