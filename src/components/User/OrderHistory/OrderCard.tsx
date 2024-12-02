import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import CustomizedSteppers from './Stepping';
import { Chip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

export const OrderCard = ({ order }: { order: any }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');

  var col:
    | 'default'
    | 'success'
    | 'warning'
    | 'primary'
    | 'secondary'
    | 'danger'
    | undefined = 'default';
  switch (order.order.orderStatus) {
    case 'COMPLETED':
      col = 'success';
      break;
    case 'PREPARING':
      col = 'warning';
      break;
    case 'DELIVERING':
      col = 'primary';
      break;
    case 'PENDING':
    default:
      col = 'default';
  }

  const handleClick = () => {
    if (isSmallScreen) {
      navigate(`/orderhistory/${order.order.orderId}`, { state: { order } });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatOrderId = (id: string) => id.substring(0, 6);

  return (
    <div className="">
      <div
        onClick={handleClick}
        className="w-[100%] flex flex-col lg:flex-col flex-grow items-left align-middle justify-between my-2 px-4 py-4 rounded-2xl border border-foodbg bg-foodbg backdrop-blur-md cursor-pointer hover:shadow-lg hover:shadow-[1px_1px_5px_#000000] dark:hover:shadow-[1px_1px_5px_#F59E0B] dark:bg-[#1E1E1E] dark:border-[#1E1E1E]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }}
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl text-black dark:text-white">
            Order: {formatOrderId(order.order.orderId)}
          </h1>
          <Chip color={col} variant="flat">
            {order.order.orderStatus}
          </Chip>
        </div>

        <div className="flex justify-left gap-2 flex-row mb-5">
          <p className="text-black dark:text-white">
            Order Date: {formatDate(order.order.orderDate)}
          </p>
          <p className="text-black dark:text-white">|</p>
          <TbTruckDelivery className="text-black dark:text-white text-2xl" />
          <p className="text-black dark:text-white">
            Total: LKR {order.order.orderSummary.total.toFixed(2)}
          </p>
        </div>

        <div className="hidden lg:block">
          <CustomizedSteppers
            stage={order.stageIndex}
            completionTimesArray={order.completionTimesArray}
          />
        </div>
      </div>
    </div>
  );
};
