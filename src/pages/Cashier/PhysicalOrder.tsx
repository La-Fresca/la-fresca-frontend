import React, { useEffect, useState } from 'react';
import Header from '@components/Cashier/Dashboard/Top'; 
import Menu from '@components/Cashier/Dashboard/Menu';
import OrderDetails from '@components/Cashier/Dashboard/OrderDetails';
import { useFoods } from '@/api/useFoods';
import { Food } from '@/types/food';


const App: React.FC = () => {
  const { getAllFoods } = useFoods();
  const [foods, setFoods] = useState<Food[]>([]);
  
  const fetchFoods = async () => {
    try {
      const foods = await getAllFoods();
      setFoods(foods);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  useEffect(() => {
    fetchFoods();
  }, []);

  const [order, setOrder] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const addItemToOrder = (item: Food) => {
    const itemInOrder = order.find((orderItem) => orderItem.name === item.name);
    if (itemInOrder) {
      setOrder(order.map((orderItem) => orderItem.name === item.name ? { ...orderItem, quantity: 1 + 1 } : orderItem));
    } else {
      setOrder([...order, { ...item }]); 
    }
  };

  const removeItemFromOrder = (itemName: string) => {
    setOrder(order.filter((item) => item.name !== itemName));
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * 1, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex flex-1 p-4">
        <Menu
          items={foods}
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
