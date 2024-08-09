import React, { useEffect } from 'react';
import { DatePicker } from '@nextui-org/react';
import OrderCard from '@/pages/DeliveryPerson/OrderCard';
import { title } from 'process';
import { useOrders } from '@/api/useOrders';
import { Order } from '@/types/order';
import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const ordersList = [
  {
    title: '#399392',
    subtitle: 'Nugegoda',
    cardImage:
      'https://www.shutterstock.com/image-vector/paper-cup-filled-black-coffee-600nw-1801429321.jpg',
    text: '5 minutes ago',
  },
  {
    title: '#322292',
    subtitle: 'Kollupitiya',
    cardImage:
      'https://images.unsplash.com/photo-1552913902-366e726db79e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: '10 minutes ago',
  },
  {
    title: '#399392',
    subtitle: 'Nugegoda',
    cardImage:
      'https://images.unsplash.com/photo-1655195672072-0ffaa663dfa4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: '15 minutes ago',
  },
  {
    title: '#322292',
    subtitle: 'Kollupitiya',
    cardImage:
      'https://images.unsplash.com/photo-1528279027-68f0d7fce9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: '20 minutes ago',
  },
  {
    title: '#399392',
    subtitle: 'Nugegoda',
    cardImage:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: '25 minutes ago',
  },
  {
    title: '#322292',
    subtitle: 'Kollupitiya',
    cardImage:
      'https://images.unsplash.com/photo-1515467410840-96a3cf21dbea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: '30 minutes ago',
  },
];

const OrderQueue = () => {
  const userId = (useAuthUser() as { userId: string }).userId;
  const { getPendingOrdersByDeliveryPersonId } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchStocks = async () => {
    try {
      const data = await getPendingOrdersByDeliveryPersonId(userId);
      setOrders(data);
      console.log(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="mx-10 my-5 flex flex-col gap-5">
      <div className="relative">
        <p className="text-xl font-bold text-white">Delivery Orders Queue</p>
        {/* <p className='text-lg'>Welcome to lafresca delivery app ...</p> */}
        {/* <DatePicker label={"Select Date"} variant="bordered" /> */}
      </div>

      <div className="flex flex-col h-[70%] overflow-auto gap-2">
        {
          // orders.map((order, index) => (
          //     <OrderCard
          //         title={order.id.toString()}
          //         subtitle={order.location}
          //         cardImage={"https://images.unsplash.com/photo-1515467410840-96a3cf21dbea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} // need to handle
          //         text={"time ago"} // need to handle
          //         key={index}
          //         buttonTitle="Pick Order"
          //     />
          // ))
          ordersList.map((order, index) => (
            <OrderCard
              title={order.title}
              subtitle={order.subtitle}
              cardImage={order.cardImage} // need to handle
              key={index}
              buttonTitle="Pick Order"
              text={''}
            />
          ))
        }
        {/* {if(orders.length > 0) :(
                orders.map((order, index) => (
                    <OrderCard
                        title={order.id.toString()}
                        subtitle={order.location}
                        cardImage={"https://images.unsplash.com/photo-1515467410840-96a3cf21dbea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} // need to handle
                        text={"time ago"} // need to handle
                        key={index}
                        buttonTitle="Pick Order"
                    />
                ))):(
                    ordersList.map((order, index) => (
                        <OrderCard
                            title={order.title}
                            subtitle={order.subtitle}
                            cardImage={order.cardImage}
                            text={order.text}
                            key={index}
                        />
                )
            } */}

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
};

export default OrderQueue;
