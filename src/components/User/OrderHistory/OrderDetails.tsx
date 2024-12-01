import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import CustomizedSteppers from './Stepping';
import { OrderItem } from './OrderItem';
import { FaCcVisa } from 'react-icons/fa';
import { Chip } from '@nextui-org/react';
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 1;
      case 'PREPARING':
        return 2;
      case 'DELIVERING':
        return 3;
      case 'COMPLETED':
        return 4;
      default:
        return 1;
    }
  };

  const stageIndex = getStageIndex(order.orderStatus);

  const getStatusChip = (status: string) => {
    let col: 'default' | 'success' | 'warning' | 'primary' = 'default';
    switch (status) {
      case 'COMPLETED':
        return (
          <Chip color="success" variant="flat">
            Completed
          </Chip>
        );
      case 'PREPARING':
        return (
          <Chip color="warning" variant="flat">
            Preparing
          </Chip>
        );
      case 'DELIVERING':
        return (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary text-black dark:text-white rounded-md px-4"
          >
            Track Order
          </button>
        );
      default:
        return (
          <Chip color="default" variant="flat">
            {status}
          </Chip>
        );
    }
  };

  const formatOrderId = (id: string) => id.substring(0, 6);

  return (
    <div className="">
      <div
        className="w-full flex flex-col lg:flex-col flex-grow items-left justify-between my-2 px-4 py-4 rounded-2xl border border-foodbg bg-foodbg pb-10 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-2xl text-black dark:text-white mb-2 md:mb-0">
            Order: {formatOrderId(order.id)}
          </h1>
          <div className="flex flex-row gap-2">
            {getStatusChip(order.orderStatus)}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-left gap-2 mb-5">
          <p className="text-black dark:text-white">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-black dark:text-white hidden md:block">|</p>
          <TbTruckDelivery className="text-black dark:text-white text-2xl hidden md:block" />
        </div>

        <div className="hidden md:block">
          <CustomizedSteppers stage={stageIndex} completionTimesArray={[]} />
        </div>
        {order.orderStatus === 'DELIVERING' && <GoogleMap />}

        <div className="flex flex-col gap-2 mx-4 md:mx-20 mt-10">
          <div className="w-full flex flex-col">
            {order.orderItems.map((item: any, index: number) => (
              <OrderItem
                key={index}
                name={item.name}
                description={
                  item.addedFeatures
                    ?.map((f: any) => `${f.name}: ${f.level}`)
                    .join(', ') || ''
                }
                price={(
                  item.price +
                  (item.addedFeatures?.reduce(
                    (sum: number, f: any) => sum + (f.additionalPrice || 0),
                    0,
                  ) || 0)
                ).toFixed(2)}
                quantity={item.quantity}
                image={item.image}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col gap-2 mb-4 md:mb-0">
              <p className="text-black dark:text-white text-xl">Delivery</p>
              <p className="text-black dark:text-white text-xs font-light">
                Address
              </p>
              <p className="text-black dark:text-white text-sm">
                {order.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-black dark:text-white text-xl mb-2">
              Order Summary
            </p>
            <div className="flex flex-col md:flex-row md:justify-between w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between w-full">
                  <p className="text-black dark:text-white text-lg">Subtotal</p>
                  <p className="text-black dark:text-white text-lg">
                    LKR {order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-black dark:text-white text-lg">Discount</p>
                  <p className="text-black dark:text-white text-lg">
                    LKR {order.discount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-2 border-t border-white" />
            <div className="flex justify-between">
              <p className="text-black dark:text-white text-lg">Total</p>
              <p className="text-black dark:text-white text-lg">
                LKR {(order.totalAmount - order.discount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
