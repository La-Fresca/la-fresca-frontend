import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import CustomizedSteppers from './Stepping';

export const OrderCard = () => {
    return (
        <div className="">
            <div
                className="w-[40%] flex flex-col lg:flex-col flex-grow items-left align-middle justify-between px-4 py-4 rounded-2xl border border-foodbg bg-foodbg  backdrop-blur-md"
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

            </div>
        </div>
    )
}
