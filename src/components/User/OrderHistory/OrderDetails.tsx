import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import CustomizedSteppers from './Stepping';
import { OrderItem } from './OrderItem';
import { FaCcVisa } from 'react-icons/fa';
import { Chip } from "@nextui-org/react";
import GoogleMap from './trackOrder';
import { useState } from 'react';

function App() {
  return (
    <div>
      <FaCcVisa />
    </div>
  );
}

export default App;

const steps = ['Order Confirmed', 'Cooking', 'Delivering', 'Delivered'];

export const OrderDetails = ({ order }: { order: any }) => {
  console.log("order1234", order);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let stageIndex = 1;
  if (order.orderStatus === 'Cooking') {
    stageIndex = 2;
  } else if (order.orderStatus === 'Delivering') {
    stageIndex = 3;
  } else if (order.orderStatus === 'Delivered') {
    stageIndex = 4;
  }

  let completionTimesArray = []

  for (let i = 0; i < steps.length; i++) {
    if (i < stageIndex) {
      completionTimesArray[i] = order.completionTimes[i]
    }
    else {
      completionTimesArray[i] = ''
    }
  }

  console.log("stageIndex", stageIndex);
  console.log("Completion Times Array", completionTimesArray);

  var addressParts = order.delivery.address ? order.delivery.address.split(',') : [];

  var col: "default" | "success" | "warning" | "primary" | "secondary" | "danger" | undefined = "default";
  var btn;
  var map;
  if (order.orderStatus == 'Delivered') {
    col = "success";
    btn = <Chip color={col} variant="flat">{order.orderStatus}</Chip>
  }
  if (order.orderStatus == 'Cooking') {
    col = "default";
    btn = <Chip color={col} variant="flat">{order.orderStatus}</Chip>
  }
  if (order.orderStatus == 'Delivering') {
    col = "warning";
    // btn = <button className='bg-primary  text-black dark:text-white rounded-md px-4'>Track Order</button>
    btn = <button onClick={() => setIsDialogOpen(true)} className='bg-primary  text-black dark:text-white rounded-md px-4'>Track Order</button>;
    map = <GoogleMap />;

  }
  if (order.orderStatus == 'Order Confirmed') {
    col = "default";
    btn = <Chip color={col} variant="flat">{order.orderStatus}</Chip>
  }


  return (
    <div className="">
      <div
        className="w-full flex flex-col lg:flex-col flex-grow items-left justify-between my-2 px-4 py-4 rounded-2xl border border-foodbg bg-foodbg pb-10 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div className='flex flex-col md:flex-row justify-between'>
          <h1 className='text-2xl  text-black dark:text-white mb-2 md:mb-0'>Order No: #{order.orderId}</h1>
          <div className='flex flex-row gap-2'>
            {btn}
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-left gap-2 mb-5'>
          <p className=' text-black dark:text-white'>Order Date: {order.orderDate}</p>
          <p className=' text-black dark:text-white hidden md:block'>|</p>
          <TbTruckDelivery className=' text-black dark:text-white text-2xl hidden md:block' />
          <p className=' text-black dark:text-white'>Estimated delivery: {order.deliveryDate}</p>
        </div>

        <div className='hidden md:block'>
          <CustomizedSteppers stage={stageIndex} completionTimesArray={completionTimesArray} />
        </div>
        {map}

        <div className='flex flex-col gap-2 mx-4 md:mx-20 mt-10'>
          <div className='w-full flex flex-col'>
            {order.orderItems.map((item: any, index: React.Key | null | undefined) => (
              <OrderItem key={index} name={item.name} description={item.description} price={item.price.toFixed(2)} quantity={item.quantity} image={item.image} />
            ))}
          </div>

          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col gap-2 mb-4 md:mb-0'>
              <p className=' text-black dark:text-white text-xl'>Payment</p>
              <div className='flex flex-row gap-5'>
                <p className=' text-black dark:text-white text-xs'>{order.payment.method} {order.payment.cardNumber}</p>
                <FaCcVisa color="white" size={15} />
              </div>
            </div>

            <div className='flex flex-col gap-2 mb-4 md:mb-0'>
              <p className=' text-black dark:text-white text-xl'>Delivery</p>
              <p className=' text-black dark:text-white text-xs font-light'>Address</p>
              {addressParts.map((part: string, index: React.Key | null | undefined) => (
                <p key={index} className=' text-black dark:text-white text-sm'>{part.trim()}</p>
              ))}
            </div>
          </div>

          <div className='flex flex-col justify-between'>
            <p className=' text-black dark:text-white text-xl mb-2'>Order Summary</p>
            <div className='flex flex-col md:flex-row md:justify-between w-full'>
              <div className='flex flex-col gap-2 w-full md:w-full'>
                <div className='flex justify-between w-full'>
                  <p className=' text-black dark:text-white text-lg'>Subtotal</p>
                  <p className=' text-black dark:text-white text-lg'>${order.orderSummary.subtotal.toFixed(2)}</p>
                </div>
                <div className='flex justify-between w-full'>
                  <p className=' text-black dark:text-white text-lg'>Shipping</p>
                  <p className=' text-black dark:text-white text-lg'>${order.orderSummary.shipping.toFixed(2)}</p>
                </div>
                <div className='flex justify-between w-full'>
                  <p className=' text-black dark:text-white text-lg'>Discount</p>
                  <p className=' text-black dark:text-white text-lg'>({order.orderSummary.discount.toFixed(2)})</p>
                </div>
              </div>
            </div>

            <hr className='my-2 border-t border-white' />
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p className=' text-black dark:text-white text-lg'>Total</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className=' text-black dark:text-white text-lg'>${order.orderSummary.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
