import React from "react";
import { DatePicker } from "@nextui-org/react";
import OrderCard from "@/pages/DeliveryPerson/OrderCard";
import { title } from "process";

const ordersList = [
    {
        title: "#399392",
        subtitle: "Nugegoda",
        cardImage: "https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg",
        text: "5 minutes ago"
    },
    {
        title: "#322292",
        subtitle: "Kollupitiya",
        cardImage: "https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg",
        text: "10 minutes ago"
    },
    {
        title: "#399392",
        subtitle: "Nugegoda",
        cardImage: "https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg",
        text: "15 minutes ago"
    },
    {
        title: "#322292",
        subtitle: "Kollupitiya",
        cardImage: "https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg",
        text: "20 minutes ago"
    },
    {
        title: "#399392",
        subtitle: "Nugegoda",
        cardImage: "https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg",
        text: "25 minutes ago"
    },
    {
        title: "#322292",
        subtitle: "Kollupitiya",
        cardImage: "https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg",
        text: "30 minutes ago"
    }
]

const OrderQueue = () => {
    return (
        <div className='mx-10 my-5 flex flex-col gap-5'>
            <div className="relative">
                <p className='text-xl font-bold text-white'>Delivery Orders Queue</p>
                {/* <p className='text-lg'>Welcome to lafresca delivery app ...</p> */}
                {/* <DatePicker label={"Select Date"} variant="bordered" /> */}
            </div>
            
            <div className="flex flex-col h-[70%] overflow-auto gap-2">
                {ordersList.map((order, index) => (
                    <OrderCard
                        title={order.title}
                        subtitle={order.subtitle}
                        cardImage={order.cardImage}
                        text={order.text}
                        key={index}
                        buttonTitle="Pick Order"
                    />
                ))}
                {/* <OrderCard
                    title="#399392"
                    subtitle="Nugegoda"
                    cardImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    text="5 minutes ago"
                />
                <OrderCard
                    title="#322292"
                    subtitle="Kollupitiya"
                    cardImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    text="10 minutes ago"
                />
                <OrderCard
                    title="#399392"
                    subtitle="Nugegoda"
                    cardImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    text="15 minutes ago"
                />
                <OrderCard
                    title="#322292"
                    subtitle="Kollupitiya"
                    cardImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    text="20 minutes ago"
                />
                <OrderCard
                    title="#399392"
                    subtitle="Nugegoda"
                    cardImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    text="25 minutes ago"
                />
                <OrderCard
                    title="#322292"
                    subtitle="Kollupitiya"
                    cardImage="https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg"
                    text="30 minutes ago"
                /> */}
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