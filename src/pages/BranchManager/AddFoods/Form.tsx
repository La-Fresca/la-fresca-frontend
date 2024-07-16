import React from 'react';
import { Input } from "@material-tailwind/react";

export const Form: React.FC = () => {
    return (
        <div className='w-full h-full bg-[#000000] rounded-md p-10'>
            <div className='flex flex-col gap-4 mb-2'>
                <h1 className='text-2xl text-white font-bold'>Add Food Item</h1>
            </div>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-col gap-4 w-1/2'>
                    <Input variant="outlined" label="Outlined" placeholder="Outlined" />
                    
                    {/* <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Name"
                    />
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Type"
                    />
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Price"
                    />
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Description"
                    /> */}
                </div>
                {/* <div className='flex flex-col gap-4 w-1/2'>
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Image"
                    />
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Quantity"
                    />
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Category"
                    />
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Food Discount"
                    />
                </div> */}
            </div>
        </div>
    );
};
