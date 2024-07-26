import React from 'react';
import { Button } from '@nextui-org/react';

const Dashboard: React.FC = () => {
  const colours = ['red', 'green', 'blue', 'yellow', 'white'];
  const itemWaitingQueue = [
    {
      id: '01',
      orderId: 102,
      time: '2',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 2,
          price: 3500,
        },
        {
          id: '02',
          name: 'Saussage Pizza',
          description: 'Indulge in our...',
          quentity: 5,
          price: 4500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '01',
      orderId: 102,
      time: '2',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 2,
          price: 3500,
        },
        {
          id: '02',
          name: 'Saussage Pizza',
          description: 'Indulge in our...',
          quentity: 5,
          price: 4500,
        },
      ],
    },
  ];

  const itemPendingQueue = [
    {
      id: '01',
      orderId: 102,
      time: '2',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 2,
          price: 3500,
        },
        {
          id: '02',
          name: 'Saussage Pizza',
          description: 'Indulge in our...',
          quentity: 5,
          price: 4500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '01',
      orderId: 102,
      time: '2',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 2,
          price: 3500,
        },
        {
          id: '02',
          name: 'Saussage Pizza',
          description: 'Indulge in our...',
          quentity: 5,
          price: 4500,
        },
      ],
    },
  ];

  const itemCompletedQueue = [
    {
      id: '01',
      orderId: 102,
      time: '2',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 2,
          price: 3500,
        },
        {
          id: '02',
          name: 'Saussage Pizza',
          description: 'Indulge in our...',
          quentity: 5,
          price: 4500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '02',
      orderId: 105,
      time: '10',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 1,
          price: 3500,
        },
      ],
    },
    {
      id: '01',
      orderId: 102,
      time: '2',
      items: [
        {
          id: '01',
          name: 'Cheese Pizza',
          description: 'Indulge in our...',
          quentity: 2,
          price: 3500,
        },
        {
          id: '02',
          name: 'Saussage Pizza',
          description: 'Indulge in our...',
          quentity: 5,
          price: 4500,
        },
      ],
    },
  ];

  var qCount = 0;
  var pCount = 0;
  var cCount = 0;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5">
        <div
          className="h-[80vh] xl:w-[24vw] bg-white rounded-xl dark:bg-gray"
          style={{
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <p className="font-bold dark:text-white text-foodbg text-2xl pt-5 text-center">
            Item Queue
          </p>
          <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
            {itemWaitingQueue.map((_: any) => {
              return (
                <div
                  className={`rounded-2xl px-2 py-2 mt-5`}
                  style={{ boxShadow: `0 0 10px 0.1px ${colours[qCount]} `}}
                >
                  <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                    Order ID: {_.orderId}
                  </p>
                  <p className="text-center text-xs"> {_.time} min ago</p>
                  {_.items.map((item: any) => {
                    return (
                      <div className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5">
                        <div className="w-[60px] h-[60px] bg-green"></div>
                        <div className="w-[110px] h-[60px]">
                          <p className="text-md">{item.name}</p>
                          <p className="text-sm">{item.description}</p>
                          <p className="text-xs">x{item.quentity}</p>
                        </div>
                        <div className="grid w-[100px]">
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                            Next
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <p style={{display: 'none'}}>{qCount++}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div
          className="h-[80vh] xl:w-[24vw] bg-white rounded-xl dark:bg-gray"
          style={{
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <p className="font-bold dark:text-white text-foodbg text-2xl pt-5 text-center">
            Item Queue
          </p>
          <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
            {itemPendingQueue.map((_: any) => {
              return (
                <div
                  className={`rounded-2xl px-2 py-2 mt-5`}
                  style={{ boxShadow: `0 0 10px 0.1px ${colours[pCount]}`}}
                >
                  <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                    Order ID: {_.orderId}
                  </p>
                  <p className="text-center text-xs"> {_.time} min ago</p>
                  {_.items.map((item: any) => {
                    return (
                      <div className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5">
                        <div className="w-[60px] h-[60px] bg-green"></div>
                        <div className="w-[110px] h-[60px]">
                          <p className="text-md">{item.name}</p>
                          <p className="text-sm">{item.description}</p>
                          <p className="text-xs">x{item.quentity}</p>
                        </div>
                        <div className="grid w-[100px]">
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                            Back
                          </Button>
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                            Next
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <p style={{display: 'none'}}>{pCount++}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="h-[80vh] xl:w-[24vw] bg-white rounded-xl dark:bg-gray"
          style={{
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <p className="font-bold dark:text-white text-foodbg text-2xl pt-5 text-center">
            Item Queue
          </p>
          <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
            {itemCompletedQueue.map((_: any) => {
              return (
                <div
                  className={`rounded-2xl px-2 py-2 mt-5`}
                  style={{ boxShadow: `0 0 10px 0.1px ${colours[cCount]}`}}
                >
                  <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                    Order ID: {_.orderId}
                  </p>
                  <p className="text-center text-xs"> {_.time} min ago</p>
                  {_.items.map((item: any) => {
                    return (
                      <div className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5">
                        <div className="w-[60px] h-[60px] bg-green"></div>
                        <div className="w-[110px] h-[60px]">
                          <p className="text-md">{item.name}</p>
                          <p className="text-sm">{item.description}</p>
                          <p className="text-xs">x{item.quentity}</p>
                        </div>
                        <div className="grid w-[100px]">
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                            Back
                          </Button>
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                            Next
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <p style={{display: 'none'}}>{cCount++}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
