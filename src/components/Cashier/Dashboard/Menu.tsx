// Menu.tsx
import React from 'react';
import { Item } from '@components/Cashier/Dashboard/Type'; 
import SearchBar from '@components/Cashier/Dashboard/Search'; 
import Image from '@images/product/pizza.png'

interface MenuProps {
  items: Item[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  addItemToOrder: (item: Item) => void;
}

const Menu: React.FC<MenuProps> = ({
  items,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  addItemToOrder
}) => {
  const categories = ['All', 'Breakfast', 'Pasta', 'Rice Bowl', 'Side Dish', 'Soup', 'Noodles'];

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
  );

  return (
    <section className="w-2/3 p-4 bg-gray shadow-lg rounded-xl border-gray-700">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex flex-wrap justify-start mb-4">
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
          <div key={item.name} className="p-4 shadow hover:bg-slate-950 bg-black bg-opacity-50 border-spacing-3 rounded-lg transform hover:scale-105 border hover:border-yellow-500 ">
            <img src={Image} alt={item.name} className="mb-2 w-full h-32 object-cover rounded" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-orange-500">LKR {item.price.toFixed(2)}</p>
            <button
              onClick={() => addItemToOrder(item)}
              className="mt-2 w-full bg-gradient-to-r from-orange-600 to-orange-400  text-white py-2 rounded-lg shadow-lg transition duration-300 hover:from-orange-950 hover:to-orange-700"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
