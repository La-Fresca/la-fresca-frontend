import React from 'react';
import { Button } from '@nextui-org/react';
import { useOrders } from '@/api/useOrders';

const Dashboard: React.FC = () => {
  const {getAllOrders} = useOrders();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  
  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const colours = ['red', 'green', 'blue', 'yellow', 'white'];


  // const orders = [
  //   {
  //     id: '01',
  //     orderId: 102,
  //     orderType: 'ONLINE',
  //     time: '2',
  //     orderStatus: 'PENDING',
  //     orderItems: [
  //       {
  //         foodId: '01',
  //         name: 'Cheese Pizza',
  //         quentity: 2,
  //         orderStatus: 'PENDING',
  //       },
  //       {
  //         foodId: '02',
  //         name: 'Chicken Pizza',
  //         quentity: 2,
  //         orderStatus: 'PENDING',
  //       },
  //       {
  //         foodId: '03',
  //         name: 'Saussage Pizza',
  //         quentity: 5,
  //         orderStatus: 'PREPARING',
  //       },
  //     ],
  //   },
  //   {
  //     id: '02',
  //     orderId: 105,
  //     orderType: 'ONLINE',
  //     time: '2',
  //     orderStatus: 'PENDING',
  //     orderItems: [
  //       {
  //         foodId: '01',
  //         name: 'Cheese Pizza',
  //         quentity: 2,
  //         orderStatus: 'PENDING',
  //       },
  //       {
  //         foodId: '03',
  //         name: 'Saussage Pizza',
  //         quentity: 5,
  //         orderStatus: 'PREPARING',
  //       },
  //       {
  //         foodId: '03',
  //         name: 'Saussage Pizza',
  //         quentity: 5,
  //         orderStatus: 'READY',
  //       },
  //     ],
  //   },
  // ];

  const itemWaitingQueue = orders
    .filter((order) => order.orderStatus === 'PENDING')
    .map((order) => ({
      ...order,
      orderItems: order.orderItems.filter(
        (orderItem: any) => orderItem.orderStatus === 'PENDING',
      ),
    }))
    .filter((order) => order.orderItems.length > 0);
    console.log(itemWaitingQueue);

  const itemPendingQueue = orders
    .filter(
      (order) =>
        order.orderStatus === 'PENDING' || order.orderStatus === 'PREPARING',
    )
    .map((order) => ({
      ...order,
      orderItems: order.orderItems.filter(
        (orderItem: any) => orderItem.orderStatus === 'PREPARING',
      ),
    }))
    .filter((order) => order.orderItems.length > 0);

  const itemCompletedQueue = orders
    .filter(
      (order) =>
        order.orderStatus === 'PENDING' || order.orderStatus === 'PREPARING',
    )
    .map((order) => ({
      ...order,
      orderItems: order.orderItems.filter(
        (orderItem: any) => orderItem.orderStatus === 'READY',
      ),
    }))
    .filter((order) => order.orderItems.length > 0);

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
                  style={{ boxShadow: `0 0 10px 0.1px ${colours[qCount]} ` }}
                >
                  <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                    Order ID: {_.id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-center text-xs"> <b className='dark:text-white'>{_.orderType}</b> | {_.createdAt} min ago</p>
                  {_.orderItems.map((item: any) => {
                    return (
                      <div className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5">
                        <div className="w-[60px] h-[60px] bg-green"></div>
                        <div className="w-[110px] h-[60px]">
                          <p className="text-md">{item.name}</p>
                          <p className="text-xs">x{item.quantity}</p>
                        </div>
                        <div className="grid w-[100px]">
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                            Next
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <p style={{ display: 'none' }}>{qCount++}</p>
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
            Processing
          </p>
          <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
            {itemPendingQueue.map((_: any) => {
              return (
                <div
                  className={`rounded-2xl px-2 py-2 mt-5`}
                  style={{ boxShadow: `0 0 10px 0.1px ${colours[pCount]} ` }}
                >
                  <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                    Order ID: {_.id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-center text-xs"> <b className='dark:text-white'>{_.orderType}</b> | {_.createdAt} min ago</p>
                  {_.orderItems.map((item: any) => {
                    return (
                      <div className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5">
                        <div className="w-[60px] h-[60px] bg-green"></div>
                        <div className="w-[110px] h-[60px]">
                          <p className="text-md">{item.name}</p>
                          <p className="text-xs">x{item.quantity}</p>
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
                  <p style={{ display: 'none' }}>{pCount++}</p>
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
            Completed
          </p>
          <div className="width-[100%] mt-2 mx-4 !overflow-scroll h-[70vh] px-2">
            {itemCompletedQueue.map((_: any) => {
              return (
                <div
                  className={`rounded-2xl px-2 py-2 mt-5`}
                  style={{ boxShadow: `0 0 10px 0.1px ${colours[cCount]} ` }}
                >
                  <p className="text-center text-foodbg dark:text-white text-lg font-bold">
                    Order ID: {_.id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-center text-xs"> <b className='dark:text-white'>{_.orderType}</b> | {_.createdAt} min ago</p>
                  {_.orderItems.map((item: any) => {
                    return (
                      <div className="border border-foodbg rounded-xl py-2 px-2 flex items-center justify-between mt-5">
                        <div className="w-[60px] h-[60px] bg-green"></div>
                        <div className="w-[110px] h-[60px]">
                          <p className="text-md">{item.name}</p>
                          <p className="text-xs">x{item.quantity}</p>
                        </div>
                        <div className="grid w-[100px]">
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg text-xl scale-50 py-5 px-10 mb-[-10px] w-[130px] h-[50px]">
                            Back
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <p style={{ display: 'none' }}>{cCount++}</p>
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
