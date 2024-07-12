import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import CustomizedSteppers from './Stepping';
import { OrderItem } from './OrderItem';
import { FaCcVisa } from 'react-icons/fa';

function App() {
  return (
    <div>
      <FaCcVisa />
    </div>
  );
}

export default App;


export const OrderDetails = () => {
  return (
    <div className="">
      <div
        className="w-[100%] flex flex-col lg:flex-col flex-grow items-left align-middle justify-between my-2 px-4 py-4 rounded-2xl border border-foodbg bg-foodbg pb-10 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <h1 className='text-2xl text-white'>Order No : #3222110</h1>
        <div className='flex justify-left gap-2 flex-row mb-5'>
          <p className='text-white'>Order Date : July 11, 2024</p>
          <p className='text-white'>|</p>
          <TbTruckDelivery className='text-white text-2xl' />
          <p className='text-white'>Estimated delivery: May 16, 2022</p>
        </div>
        <CustomizedSteppers />
        <div className='flex flex-col gap-2 mx-20 mt-10'>
          {/* <div className='flex flex-row justify-between'>
            <p className='text-white'>Items</p>
            <p className='text-white'>Price</p>
          </div> */}
          <div className=' w-full flex flex-col'>
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </div>

          <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-2'>
              <p className='text-white text-xl'>Payment</p>
              <div className='flex flex-row gap-5'>
                <p className='text-white text-xs'>Visa ****9056</p>
                <FaCcVisa color="white" size={15} />
              </div>

            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-white text-xl'>Delivery</p>
              <p className='text-white text-xs font-light'>Address</p>
              <p className='text-white text-sm'>847 Jewess Bridge Apt. 174,</p>
              <p className='text-white text-sm'>London, UK,</p>
              <p className='text-white text-sm'>474-769-3919</p>
            </div>
          </div>

          <div className='flex flex-col justify-between'>
  <p className='text-white text-xl'>Order Summary</p>
  <div className='flex flex-row justify-between'>
    <div className='flex flex-col gap-2'>
      <p className='text-white text-lg'>Subtotal</p>
      <p className='text-white text-lg'>Shipping</p>
      <p className='text-white text-lg'>Discount</p>
      {/* <hr className='my-2 border-t border-white' /> */}
      {/* <p className='text-white text-lg'>Total</p> */}
    </div>
    
    <div className='flex flex-col gap-2 items-end'>
      <p className='text-white text-lg'>$5554.00</p>
      <p className='text-white text-lg'>$0.00</p>
      <p className='text-white text-lg'>(20%) - $1109.40</p>
      {/* <hr className='my-2 border-t border-white' /> */}
      {/* <p className='text-white text-lg'>$4443.60</p> */}
    </div>
  </div>
  <hr className='my-2 border-t border-white' />
  <div className='flex flex-row justify-between'>
    <div className='flex flex-col gap-2'>
      <p className='text-white text-lg'>Total</p>
    </div>
    
    <div className='flex flex-col gap-2'>
      <p className='text-white text-lg'>$4443.60</p>
    </div>
  </div>
</div>


        </div>

      </div>
    </div>
  )
}
