import React from 'react'
import HomeCard from '@pages/DeliveryPerson/HomeCard'
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


const DeliveryHome = () => {
    const navigate = useNavigate();

    const goToOngoingTrip = () => {
        navigate('./path');
    };

    return (
        <div className='mx-10 my-5 flex flex-col gap-5'>
            <div>
                <p className='text-xl font-bold text-white'>Good morning Ravindu!</p>
                <p className='text-lg'>Welcome to lafresca delivery app ...</p>
            </div>

            <HomeCard title='Deliveries Queue' stat='0' />
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
            </Button>
        </div>
    )
}

export default DeliveryHome;
