import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import CustomizedSteppers from './Stepping';
import {Chip} from "@nextui-org/react";

export const OrderCard = ({ order }:{order:any}) => {
    console.log("order",order.order.orderStatus);
    var col: "default" | "success" | "warning" | "primary" | "secondary" | "danger" | undefined = "default";
    if(order.order.orderStatus == 'Delivered'){
        col = "success";
    }
    if(order.order.orderStatus == 'Cooking'){
        col = "default";
    }
    if(order.order.orderStatus == 'Delivering'){
        col = "warning";
    }
    if(order.order.orderStatus == 'Order Confirmed'){
        col = "default";
    }
    return (
        <div className="">
            <div
                className="w-[100%] flex flex-col lg:flex-col flex-grow items-left align-middle justify-between my-2 px-4 py-4 rounded-2xl border border-foodbg bg-foodbg  backdrop-blur-md"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.01)',
                }}
            >
                <div className='flex flex-row justify-between'>
                <h1 className='text-2xl text-white'>Order No: #{order.order.orderId}</h1>
                {/* <Chip color="warning" variant="shadow">Shadow</Chip> */}
                <Chip color={col} variant="flat">{order.order.orderStatus}</Chip>
                </div>
                
                <div className='flex justify-left gap-2 flex-row mb-5'>
                    <p className='text-white'>Order Date: {order.order.orderDate}</p>
                    <p className='text-white'>|</p>
                    <TbTruckDelivery className='text-white text-2xl' />
                    <p className='text-white'>Estimated delivery: {order.order.deliveryDate}</p>
                </div>
                
                <CustomizedSteppers stage={order.stageIndex} completionTimesArray={order.completionTimesArray} />
            </div>
        </div>
    );
}
