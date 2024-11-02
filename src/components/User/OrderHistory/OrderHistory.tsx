import React, { useState } from 'react';
import { OrderCard } from './OrderCard';
import { OrderDetails } from './OrderDetails';
import { set } from 'zod';

var Orders = [
  {
    orderId: 1,
    orderDate: '2021-10-10',
    deliveryDate: '2021-10-11',
    orderStatus: 'Cooking',
    completionTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    orderItems: [
      {
        name: 'Chocolate Milkshake',
        description: 'Rich and creamy chocolate milkshake.',
        price: 3900,
        quantity: 30,
        image:
          'https://www.seriouseats.com/recipes/images/2013/07/chocolate-milkshake-hero.jpg', // Image of Chocolate Milkshake
      },
      {
        name: 'Vanilla Ice Cream',
        description: 'Smooth vanilla ice cream made with real vanilla beans.',
        price: 1200,
        quantity: 20,
        image:
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', // Existing image seems relevant
      },
      {
        name: 'Strawberry Smoothie',
        description: 'Refreshing strawberry smoothie with fresh strawberries.',
        price: 1500,
        quantity: 15,
        image:
          'https://www.inspiredtaste.net/wp-content/uploads/2020/01/Strawberry-Smoothie-2-1200x800.jpg', // Image of Strawberry Smoothie
      },
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****1156',
    },
    delivery: {
      address: '847 Jewess Bridge Apt. 174, London, UK, 474-769-3919',
    },
    orderSummary: {
      subtotal: 5554,
      shipping: 0,
      discount: 1109.4,
      total: 4443.6,
    },
  },
  {
    orderId: 2,
    orderDate: '2021-10-17',
    deliveryDate: '2021-10-11',
    orderStatus: 'Delivered',
    completionTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    orderItems: [
      {
        name: 'Cheeseburger',
        description:
          'Juicy cheeseburger with cheddar cheese and fresh vegetables.',
        price: 900,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      },
      {
        name: 'Chicken Sandwich',
        description: 'Grilled chicken sandwich with lettuce and tomato.',
        price: 3900,
        quantity: 5,
        image:
          'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      },
      {
        name: 'French Fries',
        description: 'Crispy french fries with a side of ketchup.',
        price: 2900,
        quantity: 3,
        image:
          'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      },
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****9016',
    },
    delivery: {
      address: '847 Jewess Bridge Apt. 174, London, UK, 474-769-3919',
    },
    orderSummary: {
      subtotal: 5554,
      shipping: 0,
      discount: 1109.4,
      total: 4443.6,
    },
  },
  {
    orderId: 3,
    orderDate: '2021-10-10',
    deliveryDate: '2021-10-11',
    orderStatus: 'Delivering',
    completionTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    orderItems: [
      {
        name: 'Margherita Pizza',
        description:
          'Classic margherita pizza with fresh basil and mozzarella.',
        price: 3900,
        quantity: 30,
        image:
          'https://images.unsplash.com/photo-1592417815420-19657db8b86c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      },
      {
        name: 'Pepperoni Pizza',
        description:
          'Pepperoni pizza with a crispy crust and savory pepperoni.',
        price: 3900,
        quantity: 30,
        image:
          'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      },
      {
        name: 'Vegetarian Pizza',
        description: 'Vegetarian pizza loaded with fresh vegetables.',
        price: 3900,
        quantity: 30,
        image:
          'https://images.unsplash.com/photo-1590879051073-d2f328a3a685?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      },
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****9056',
    },
    delivery: {
      address: '847 Jewess Bridge Apt. 174, London, UK, 474-769-3919',
    },
    orderSummary: {
      subtotal: 5554,
      shipping: 0,
      discount: 1109.4,
      total: 4443.6,
    },
  },
];

var selectedOrder = Orders[0];

const steps = ['Order Confirmed', 'Cooking', 'Delivering', 'Delivered'];
// var completionTimes = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']; // Example times

export const OrderHistory = () => {
  const [item, setItem] = useState(0);

  const clickFunction = (order: number) => {
    setItem(order);
    // console.log("Item",order);
  };

  return (
    // Use flex-row for larger screens and flex-col for smaller screens
    <>
      <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Order History</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Keep track of all past orders effortlessly, making reordering favorites quick and simple.
      </div>

      <div className="flex flex-col lg:flex-row w-screen px-4 lg:px-10 mt-8">
        {/* For smaller screens, set the width to 100% and for larger screens, use 40% width */}
        <div className="w-full lg:w-[40%] flex flex-col mx-4 lg:mx-10">
          {Orders.map((order, index) => {
            let stageIndex = 1;
            if (order.orderStatus === 'Cooking') {
              stageIndex = 2;
            } else if (order.orderStatus === 'Delivering') {
              stageIndex = 3;
            } else if (order.orderStatus === 'Delivered') {
              stageIndex = 4;
            }

            let completionTimesArray = [];

            for (let i = 0; i < steps.length; i++) {
              if (i < stageIndex) {
                completionTimesArray[i] = order.completionTimes[i];
              } else {
                completionTimesArray[i] = '';
              }
            }

            return (
              <div onClick={() => clickFunction(index)} key={order.orderId}>
                <OrderCard
                  order={{ order, completionTimesArray, stageIndex }}
                />
              </div>
            );
          })}
        </div>
        {/* For smaller screens, set the width to 100% and for larger screens, use 60% width */}
        <div className="w-full lg:w-[60%] flex flex-col mx-4 lg:mx-10">
          <OrderDetails order={Orders[item]} />
        </div>
      </div>
    </>
  );
};
