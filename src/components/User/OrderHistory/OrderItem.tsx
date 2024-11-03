import React from 'react';

interface OrderItemProps {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

export const OrderItem: React.FC<OrderItemProps> = ({ name, description, price, quantity, image }) => {
    console.log('OrderItem', name, description, price, quantity, image);
    return (
        <div className='w-full flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 mb-4 rounded-lg shadow-md'>
            <div className='w-full md:w-1/6 border rounded-md border-white' style={{ aspectRatio: '1 / 1' }}>
                <img src={image} alt={name} className='w-full h-full object-cover rounded-md' />
            </div>

            <div className='w-full md:w-3/6 mx-5 flex-grow mt-2 md:mt-0'>
                <p className=' text-black dark:text-white text-xl font-bold'>{name}</p>
                <p className=' text-black dark:text-white text-sm'>{description}</p>
            </div>

            <div className='w-full md:w-2/6 flex flex-col items-end mt-2 md:mt-0'>
                {/* Show price and quantity labels only on small devices */}
                <p className=' text-black dark:text-white text-base font-normal sm:hidden'>Price: ${price}</p>
                <p className=' text-black dark:text-white text-lg font-semibold sm:hidden'>Qty: {quantity}</p>
                {/* Show price and quantity without labels on larger devices */}
                <p className='hidden sm:block  text-black dark:text-white text-lg font-semibold'>${price}</p>
                <p className='hidden sm:block  text-black dark:text-white text-base font-normal'>Qty: {quantity}</p>
            </div>
        </div>
    );
};
