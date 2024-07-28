import React from "react";
import { DatePicker } from "@nextui-org/react";
import OrderCard from "@/pages/DeliveryPerson/OrderCard";

const OrderQueue = () => {
    return (
        <div className='mx-10 my-5 flex flex-col gap-5'>
            <div className="relative">
                <p className='text-xl font-bold text-white'>Delivery Orders Queue</p>
                {/* <p className='text-lg'>Welcome to lafresca delivery app ...</p> */}
                {/* <DatePicker label={"Select Date"} variant="bordered" /> */}
            </div>
            
            <div className="flex flex-col h-[70%] overflow-auto gap-2">
                <OrderCard
                    waiterId={1}
                    waiterName="jone doe"
                    waiterImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    waiterStatus="{waiter.waiterStatus}"
                />
                <OrderCard
                    waiterId={1}
                    waiterName="jone doe"
                    waiterImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    waiterStatus="{waiter.waiterStatus}"
                />
                <OrderCard
                    waiterId={1}
                    waiterName="jone doe"
                    waiterImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    waiterStatus="{waiter.waiterStatus}"
                />
                <OrderCard
                    waiterId={1}
                    waiterName="jone doe"
                    waiterImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    waiterStatus="{waiter.waiterStatus}"
                />
                <OrderCard
                    waiterId={1}
                    waiterName="jone doe"
                    waiterImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    waiterStatus="{waiter.waiterStatus}"
                />
                <OrderCard
                    waiterId={1}
                    waiterName="jone doe"
                    waiterImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    waiterStatus="{waiter.waiterStatus}"
                />
            </div>

            {/* <HomeCard title='Deliveries Queue' stat='0' />
            <HomeCard title='Completed Deliveries' stat='5' />
            <Button
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl">
                Order history
            </Button>
            <Button
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl" onClick={goToOngoingTrip}>
                Ongoing Order
            </Button>
            <Button
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl">
                View Order Queue
            </Button> */}
        </div>
    );
}

export default OrderQueue;