import React, { useState } from 'react';
import Header from '@components/Cashier/Dashboard/Top';
import Menu from '@components/Cashier/Dashboard/Menu';
import OrderDetails from '@components/Cashier/Dashboard/OrderDetails';
import { useFoods } from '@/api/useFoodItem';
import { useCategories } from '@/api/useCategory';
import { useQuery } from '@tanstack/react-query';
import { Item } from '@/types/item';
import { Category } from '@/types/category';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useOrders } from '@/api/useOrder';
import { swalSuccess } from '@/components/UI/SwalSuccess';

const App: React.FC = () => {
  const { getAllFoods } = useFoods();
  const { getAllCategories } = useCategories();
  const { createOrder } = useOrders();

  const [order, setOrder] = useState<OrderItem[]>([]);
  const userId = (useAuthUser() as { userId: string }).userId;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customizedItems, setCustomizedItems] = useState<
    Record<string, number>
  >({});
  const [customizedFeatures, setCustomizedFeatures] = useState<
    Record<string, any>
  >({});

  const { showSwal } = swalSuccess({
    message: 'Order Billed Successfully',
  });

  const handleCustomizedItem = (
    itemId: string,
    newPrice: number,
    features: any,
  ) => {
    const customId = `${itemId}-custom-${Date.now()}`;
    setCustomizedFeatures((prev) => ({ ...prev, [customId]: features }));
    setCustomizedItems((prev) => ({ ...prev, [customId]: newPrice }));
  };

  const foodQuery = useQuery({
    queryKey: ['foods'],
    queryFn: getAllFoods,
  });

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  if (foodQuery.isLoading || categoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (foodQuery.isError) {
    return <div>Error: {JSON.stringify(foodQuery.error)}</div>;
  }

  if (categoryQuery.isError) {
    return <div>Error: {JSON.stringify(categoryQuery.error)}</div>;
  }

  const items: Item[] = foodQuery.data;
  const categoriesObject: Category[] = categoryQuery.data;
  const categories = categoriesObject.map((category) => category.name);

  const addItemToOrder = (item: Item, customId?: string) => {
    setOrder((prevOrder) => {
      const orderItem = {
        ...item,
        id: customId || item.id,
        name: customId ? `${item.name} (Customized)` : item.name,
        price: customId ? customizedItems[customId] : item.price,
        customFeatures: customId ? customizedFeatures[customId] : undefined,
        quantity: 1,
      };

      const existingItem = prevOrder.find((i) => i.id === orderItem.id);

      if (existingItem) {
        return prevOrder.map((i) =>
          i.id === orderItem.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prevOrder, orderItem];
    });
  };

  const removeItemFromOrder = (itemName: string) => {
    setOrder(order.filter((item) => item.name !== itemName));
  };

  const reduceItemQuantity = (itemName: string) => {
    setOrder(
      (prevOrder) =>
        prevOrder
          .map((item) =>
            item.name === itemName
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0), // Remove items with quantity <= 0
    );
  };

  const calculateTotal = () => {
    return order
      .reduce((total, item) => total + item.totalPrice, 0) // Changed to use totalPrice
      .toFixed(2);
  };

  const calculateItemCount = () => {
    return order.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToOrder = (orderItem: OrderItem) => {
    setOrder((prev) => [...prev, orderItem]);
  };

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        orderType: 'OFFLINE',
        totalAmount: order.reduce((sum, item) => sum + item.totalPrice, 0),
        orderStatus: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        orderItems: order,
        cashierId: userId,
      };
      await createOrder(orderData);
      setOrder([]);
      showSwal();
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex flex-1 p-4">
        <Menu
          items={items}
          categories={categories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addItemToOrder={addItemToOrder}
          onCustomize={handleCustomizedItem}
          customizedItems={customizedItems}
          customizedFeatures={customizedFeatures}
          onAddToOrder={handleAddToOrder}
        />
        <OrderDetails
          order={order}
          removeItemFromOrder={removeItemFromOrder}
          calculateTotal={calculateTotal}
          reduceItemQuantity={reduceItemQuantity}
          calculateItemCount={calculateItemCount}
          onSubmitOrder={handleSubmitOrder}
        />
      </main>
    </div>
  );
};

export default App;
