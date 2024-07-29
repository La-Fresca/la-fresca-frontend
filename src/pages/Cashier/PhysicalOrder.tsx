import React, { useState } from 'react';
import Header from '@components/Cashier/Dashboard/Top'; 
import Menu from '@components/Cashier/Dashboard/Menu';
import OrderDetails from '@components/Cashier/Dashboard/OrderDetails';
import { Item } from '@components/Cashier/Dashboard/Type';


const initialItems: Item[] = [
  { name: 'Cheese Pizza', price: 1500, category: 'Breakfast',  quantity: 1 },
  { name: 'Mutton Stu', price: 1250, category: 'Breakfast', quantity: 1 },
  { name: 'Ramen', price: 800, category: 'Pasta', quantity: 1 },
  { name: 'Egg Fried Rice', price: 900, category: 'Rice Bowl', quantity: 1 },
  { name: 'Cheese Burger', price: 750, category: 'Side Dish', quantity: 1 },
  { name: 'Egg Soup ', price: 600, category: 'Soup', quantity: 1 },
  { name: 'Indomie Soto', price: 1300, category: 'Noodles', quantity: 1 },
  { name: 'Red Noodles', price: 700, category: 'Noodles', quantity: 1 },
  { name: 'Bread Toast with Egg', price: 800, category: 'Breakfast', quantity: 1 },
  { name: 'Bread Toast with Egg', price: 800, category: 'Breakfast', quantity: 1 },
];

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [order, setOrder] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const addItemToOrder = (item: Item) => {
    const itemInOrder = order.find((orderItem) => orderItem.name === item.name);
    if (itemInOrder) {
      setOrder(order.map((orderItem) => orderItem.name === item.name ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem));
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromOrder = (itemName: string) => {
    setOrder(order.filter((item) => item.name !== itemName));
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
