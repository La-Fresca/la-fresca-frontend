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
        <div className='w-full flex flex-row justify-between items-center p-4 bg-gray-800'>
            <div className='w-1/6 border rounded-md border-white' style={{ aspectRatio: '1 / 1' }}>
            <img src={image} alt='food' className='w-full h-full object-cover' />
            </div>

            <div className='w-3/6 mx-5 flex-grow'>
                <p className='text-white text-xl font-bold'>{name}</p>
                <p className='text-white'>{description}</p>
            </div>
            <div className='w-2/6 flex flex-col items-end'>
                <p className='text-white text-xl font-semibold'>{price}</p>
                <p className='text-white text-base font-normal'>{quantity}</p>
            </div>
        </div>
    );
}
