import React from 'react';

export const OrderItem = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center p-4 bg-gray-800'>
            <div className='w-1/6'>
                <img src='https://via.placeholder.com/150' alt='food' className='w-full h-auto object-cover' />
            </div>
            <div className='w-3/6 mx-5 flex-grow'>
                <p className='text-white text-xl font-bold'>Food Name</p>
                <p className='text-white'>Food Description</p>
            </div>
            <div className='w-2/6 flex flex-col items-end'>
                <p className='text-white text-xl font-semibold'>Price</p>
                <p className='text-white text-base font-normal'>Quantity</p>
            </div>
        </div>
    );
}
