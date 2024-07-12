import React from 'react'
import { OrderCard } from './OrderCard'
import { OrderDetails } from './OrderDetails'

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
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      }
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****9056'
    },
    delivery: {
      address: '847 Jewess Bridge Apt. 174, London, UK, 474-769-3919'
    },
    orderSummary: {
      subtotal: 5554,
      shipping: 0,
      discount: 1109.4,
      total: 4443.6
    }
  },
  {
    orderId: 2,
    orderDate: '2021-10-17',
    deliveryDate: '2021-10-11',
    orderStatus: 'Delivered',
    completionTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'], // Added this line
    orderItems: [
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      }
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****9056'
    },
    delivery: {
      address: '847 Jewess Bridge Apt. 174, London, UK, 474-769-3919'
    },
    orderSummary: {
      subtotal: 5554,
      shipping: 0,
      discount: 1109.4,
      total: 4443.6
    }
  },
  {
    orderId: 3,
    orderDate: '2021-10-10',
    deliveryDate: '2021-10-11',
    orderStatus: 'Delivered',
    completionTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'], // Added this line
    orderItems: [
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Lormdknkane knkejnne ked',
        price: 3900,
        quantity: 30
      }
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****9056'
    },
    delivery: {
      address: '847 Jewess Bridge Apt. 174, London, UK, 474-769-3919'
    },
    orderSummary: {
      subtotal: 5554,
      shipping: 0,
      discount: 1109.4,
      total: 4443.6
    }
  }
];

const steps = ['Order Confirmed', 'Cooking', 'Delivering', 'Delivered'];
// var completionTimes = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']; // Example times

export const OrderHistory = () => {
  
  return (
    <div className='flex flex-row w-screen px-10'>
      <div className='w-[40%] flex flex-col mx-10'>
        {Orders.map((order) => {
          let stageIndex = 1;
          if (order.orderStatus === 'Cooking') {
            stageIndex = 2;
          } else if (order.orderStatus === 'Delivering') {
            stageIndex = 3;
          } else if (order.orderStatus === 'Delivered') {
            stageIndex = 4;
          }

          let completionTimesArray = []

          for(let i = 0; i<steps.length; i++){
            if(i<stageIndex){
              completionTimesArray[i] = order.completionTimes[i]
            }
            else{
              completionTimesArray[i] = ''
            }
          }

          // let completionTimesArray = [...order.completionTimes];
          // for (let i = stageIndex; i < steps.length+1; i++) {
          //   completionTimesArray[i] = '';
          // }

          console.log("stageIndex",stageIndex);
          console.log("Completion Times Array",completionTimesArray);

          return <OrderCard key={order.orderId} order={{ order, completionTimesArray , stageIndex }} />;
        })}
      </div>
      <div className='w-[60%] flex flex-col mx-10'>
        <OrderDetails />
      </div>
    </div>
  );
};