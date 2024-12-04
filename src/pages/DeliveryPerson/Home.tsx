import React, { useEffect, useState } from 'react';
import HomeCard from '@pages/DeliveryPerson/HomeCard';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDelivery } from '@/api/useDelivery';
import { Deliverystat } from '@/types/order';

const DeliveryHome = () => {
  const navigate = useNavigate();
  const { Dashboard } = useDelivery();
  const [stat, setStat] = useState<Deliverystat>({
    queue: 0,
    history: 0,
  }); // Initialize the state with default values

  const goToOngoingTrip = () => {
    navigate('./path');
  };

  const goToHistory = () => {
    navigate('./history');
  };

  const goToOrderQueue = () => {
    navigate('./queue');
  };

  // Call Dashboard function only once when the component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await Dashboard(); // Call Dashboard function
        console.log('Dashboard result:', result); // Log the result to the console
        setStat(result); // Set the state with the fetched data
      } catch (error) {
        console.error('Error fetching dashboard data:', error); // Handle errors
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="mx-10 my-5 flex flex-col gap-5">
      <div>
        <p className="text-xl font-bold text-white">Good morning Ravindu!</p>
        <p className="text-lg">Welcome to Lafresca delivery app ...</p>
      </div>

      <HomeCard title="Deliveries Queue" stat={stat.queue.toString()} />
      <HomeCard title="Completed Deliveries" stat={stat.history.toString()} />
      <Button
        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl"
        onClick={goToHistory}
      >
        Order history
      </Button>
      <Button
        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl"
        onClick={goToOngoingTrip}
      >
        Ongoing Order
      </Button>
      <Button
        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl"
        onClick={goToOrderQueue}
      >
        View Order Queue
      </Button>
    </div>
  );
};

export default DeliveryHome;
