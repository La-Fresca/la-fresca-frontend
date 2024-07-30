import React, { useState } from 'react';
import Header from '@components/Cashier/Dashboard/Top';
import Menu from '@components/Cashier/Dashboard/Menu';
import OrderDetails from '@components/Cashier/Dashboard/OrderDetails';
import { Item } from '@components/Cashier/Dashboard/Type';
import Image from '@images/product/pizza.png';

const initialItems: Item[] = [
  {
    name: 'Cheese Pizza',
    price: 1100,
    category: 'Pizza',
    quantity: 1,
    image:
      'https://simple-uploadddddddddd.iamtrazy.eu.org/uploads/1722279635684-bdba90a67b204831.png',
  },
  {
    name: 'BBQ pizza',
    price: 1100,
    category: 'Pizza',
    quantity: 1,
    image:
      'https://simple-uploadddddddddd.iamtrazy.eu.org/uploads/1722279635684-bdba90a67b204831.png',
  },
  {
    name: 'Ramen',
    price: 800,
    category: 'Pasta',
    quantity: 1,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2paowiODEqEOJ082fLEWgrlBjvBlGd2GrQ&s',
  },
  {
    name: 'Egg Fried Rice',
    price: 900,
    category: 'Side Dish',
    quantity: 1,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4o2hOc9AC-1kziBlLQke6RPIPYcqkKVSm5Q&s',
  },
  {
    name: 'Cheese Burger',
    price: 750,
    category: 'Burgers',
    quantity: 1,
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/03/Hasselback-Potatoes-a818dcb.jpg?quality=90&resize=556,505',
  },
  {
    name: 'Egg Soup ',
    price: 600,
    category: 'Soup',
    quantity: 1,
    image:
      'https://www.inspiredtaste.net/wp-content/uploads/2022/01/Creamy-Chicken-Noodle-Soup-3-1200-1200x800.jpg',
  },
  {
    name: 'Indomie Soto',
    price: 1300,
    category: 'Noodles',
    quantity: 1,
    image:
      'https://tiffycooks.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-21-at-5.21.37-PM.png',
  },
  {
    name: 'Red Noodles',
    price: 700,
    category: 'Noodles',
    quantity: 1,
    image:
      'https://www.nigella.com/assets/uploads/recipes/public-thumbnail/rubynoodles-5fbfd2f95f852.jpg',
  },
  {
    name: 'Bread Toast with Egg',
    price: 800,
    category: 'Side Dish',
    quantity: 1,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvMDB6p1Jw3OkjqrOCPI5YH6E9SS3p95vUCQ&s',
  },
];

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [order, setOrder] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [image, setImage] = useState<string>('');

  const addItemToOrder = (item: Item) => {
    const itemInOrder = order.find((orderItem) => orderItem.name === item.name);
    if (itemInOrder) {
      setOrder(
        order.map((orderItem) =>
          orderItem.name === item.name
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem,
        ),
      );
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromOrder = (itemName: string) => {
    setOrder(order.filter((item) => item.name !== itemName));
  };

  const calculateTotal = () => {
    return order
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex flex-1 p-4">
        <Menu
          items={items}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addItemToOrder={addItemToOrder}
          image={image}
        />
        <OrderDetails
          order={order}
          removeItemFromOrder={removeItemFromOrder}
          calculateTotal={calculateTotal}
        />
      </main>
    </div>
  );
};

export default App;
