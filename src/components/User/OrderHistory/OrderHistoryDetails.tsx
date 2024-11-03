import React, { useState, useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { OrderDetails } from './OrderDetails';
import { useParams } from 'react-router-dom';

interface OrderItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface Payment {
  method: string;
  cardNumber: string;
}

interface Delivery {
  address: string;
}

interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

interface Order {
  orderId: number;
  orderDate: string;
  deliveryDate: string;
  orderStatus: string;
  completionTimes: string[];
  orderItems: OrderItem[];
  payment: Payment;
  delivery: Delivery;
  orderSummary: OrderSummary;
}

// Sample data for orders
const Orders: Order[] = [
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
        image: 'https://www.seriouseats.com/recipes/images/2013/07/chocolate-milkshake-hero.jpg'
      },
      {
        name: 'Vanilla Ice Cream',
        description: 'Smooth vanilla ice cream made with real vanilla beans.',
        price: 1200,
        quantity: 20,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
      },
      {
        name: 'Strawberry Smoothie',
        description: 'Refreshing strawberry smoothie with fresh strawberries.',
        price: 1500,
        quantity: 15,
        image: 'https://www.inspiredtaste.net/wp-content/uploads/2020/01/Strawberry-Smoothie-2-1200x800.jpg'
      }
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****1156'
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
    completionTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    orderItems: [
      {
        name: 'Cheeseburger',
        description: 'Juicy cheeseburger with cheddar cheese and fresh vegetables.',
        price: 900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
      },
      {
        name: 'Chicken Sandwich',
        description: 'Grilled chicken sandwich with lettuce and tomato.',
        price: 3900,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
      },
      {
        name: 'French Fries',
        description: 'Crispy french fries with a side of ketchup.',
        price: 2900,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
      }
    ],
    payment: {
      method: 'Visa',
      cardNumber: '****9016'
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
    orderStatus: 'Delivering',
    completionTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    orderItems: [
      {
        name: 'Margherita Pizza',
        description: 'Classic margherita pizza with fresh basil and mozzarella.',
        price: 3900,
        quantity: 30,
        image: 'https://images.unsplash.com/photo-1592417815420-19657db8b86c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Pepperoni pizza with a crispy crust and savory pepperoni.',
        price: 3900,
        quantity: 30,
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
      },
      {
        name: 'Vegetarian Pizza',
        description: 'Vegetarian pizza loaded with fresh vegetables.',
        price: 3900,
        quantity: 30,
        image: 'https://images.unsplash.com/photo-1590879051073-d2f328a3a685?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
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

export const OrderHistoryDetails = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Use useParams to get orderId from the URL
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // Initialize state to hold selected order

  useEffect(() => {
    const order = Orders[parseInt(orderId || '0')]; // Find the order based on orderId
    setSelectedOrder(order || null); // Set the selected order or null if not found
  }, [orderId]);

  if (!selectedOrder) {
    return <p>Loading order details or order not found...</p>; // Display message if order is not found
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full lg:w-screen px-4 lg:px-10">
      

      <div className="block w-full lg:w-[60%] flex flex-col mx-2 lg:mx-10 mt-4 lg:mt-0">
        <OrderDetails order={selectedOrder} />
      </div>
    </div>
  );
};
