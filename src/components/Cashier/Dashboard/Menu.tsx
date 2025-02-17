import React, { useState, useRef, useEffect } from 'react';
import { Item } from '@/types/item';
import SearchBar from '@components/Cashier/Dashboard/Search';
import ItemCustomCard from '@/components/Cashier/FoodItem/index';
import { Food } from '@/types/food';

interface MenuProps {
  items: Food[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  addItemToOrder: (item: Item, customId?: string) => void;
  categories: string[];
  onCustomize: (itemId: string, price: number, features: any) => void;
  customizedItems: Record<string, number>;
  customizedFeatures: Record<string, any>;
  onAddToOrder: (orderItem: OrderItem) => void;
}

const Menu: React.FC<MenuProps> = ({
  items,
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  addItemToOrder,
  onCustomize,
  customizedItems,
  customizedFeatures,
  onAddToOrder,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [customizedPrices, setCustomizedPrices] = useState<
    Record<string, number>
  >({});
  const popupRef = useRef<HTMLDivElement | null>(null);
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' ||
        item.categories.includes(selectedCategory)),
  );

  const togglePopup = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  const handleCustomizedPrice = (
    itemId: string,
    newPrice: number,
    features: any,
  ) => {
    const customId = `${itemId}-custom-${Date.now()}`;
    onCustomize(customId, newPrice, features);
    setIsPopupOpen(false);
  };

  const handleCustomization = (orderItem: OrderItem) => {
    onAddToOrder(orderItem);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <section className="w-2/3 p-4 bg-gray shadow-lg rounded-xl border-gray-700">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex flex-wrap justify-start mb-4">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`mr-2 mb-2 px-4 py-2 rounded-lg h-10 ${
            selectedCategory === 'All' ? 'bg-orange-500' : 'bg-yellow-500'
          } hover:bg-orange-700 transition duration-300 text-md font-medium`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`mr-2 mb-2 px-4 py-2 rounded-lg h-10 ${
              selectedCategory === category ? 'bg-orange-500' : 'bg-yellow-500'
            } hover:bg-orange-700 transition duration-300 text-md font-medium`}
          >
            {category}
          </button>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 shadow hover:bg-slate-950 bg-black bg-opacity-50 border-spacing-3 rounded-lg transform hover:scale-105 border hover:border-yellow-500 "
            onClick={() => togglePopup(item.id)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="mb-2 w-full h-32 object-cover rounded"
            />
            <h3 className="text-lg font-semibold h-15">{item.name}</h3>
            <p className="text-orange-500">
              Rs.{(customizedItems[item.id] || item.price).toFixed(2)}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePopup(item.id);
              }}
              className="mt-2 w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white py-2 rounded-lg shadow-lg transition duration-300 hover:from-orange-950 hover:to-orange-700"
            >
              Add to Order
            </button>
          </div>
        ))}
        {isPopupOpen && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div ref={popupRef}>
              <ItemCustomCard
                id={selectedItemId}
                onConfirm={handleCustomization}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
