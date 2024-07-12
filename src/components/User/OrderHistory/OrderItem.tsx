import React from 'react';

export const OrderItem = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center p-4 bg-gray-800'>
            <div className='w-1/6 border rounded-md border-white' style={{ aspectRatio: '1 / 1' }}>
                <img src='https://images.unsplash.com/photo-1502719414926-613118be79d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='food' className='w-full h-full object-cover' />
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
