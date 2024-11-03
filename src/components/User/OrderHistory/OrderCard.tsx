import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import CustomizedSteppers from './Stepping';
import { Chip } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

export const OrderCard = ({ order }:{order:any}) => {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width: 1024px)'); // Adjust breakpoint as needed

    var col: "default" | "success" | "warning" | "primary" | "secondary" | "danger" | undefined = "default";
    if(order.order.orderStatus === 'Delivered'){
        col = "success";
    } else if(order.order.orderStatus === 'Cooking'){
        col = "default";
    } else if(order.order.orderStatus === 'Delivering'){
        col = "warning";
    } else if(order.order.orderStatus === 'Order Confirmed'){
        col = "default";
    }

    const handleClick = () => {
        if (isSmallScreen) {
            // Navigate to the details page if on a small screen
            navigate(`/orderhistory/${order.order.orderId}`, { state: { order } });
        }
    };

    return (
        <div className="">
            <div
                onClick={handleClick}
                className="w-[100%] flex flex-col lg:flex-col flex-grow items-left align-middle justify-between my-2 px-4 py-4 rounded-2xl border border-foodbg bg-foodbg backdrop-blur-md cursor-pointer"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.01)',
                }}
            >
                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl text-white'>Order No: #{order.order.orderId}</h1>
                    <Chip color={col} variant="flat">{order.order.orderStatus}</Chip>
                </div>
                
                <div className='flex justify-left gap-2 flex-row mb-5'>
                    <p className='text-white'>Order Date: {order.order.orderDate}</p>
                    <p className='text-white'>|</p>
                    <TbTruckDelivery className='text-white text-2xl' />
                    <p className='text-white'>Estimated delivery: {order.order.deliveryDate}</p>
                </div>
                
                {/* Show stepper only on larger screens */}
                <div className='hidden lg:block'>
                    <CustomizedSteppers stage={order.stageIndex} completionTimesArray={order.completionTimesArray} />
                </div>
            </div>
        </div>
    );
};
