import Food from '@images/product/pizza.png';
import { Checkbox, Button } from '@nextui-org/react';
import QtySelector from './QtySelector';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

function Index() {
  const [selectedItems, setSelectedItems] = useState<Record<string, { price: number; quantity: number }>>({});
  const [price, setPrice] = useState<number>(0);

  // Function to calculate the total price
  const calculateTotalPrice = useCallback(() => {
    const total = Object.values(selectedItems).reduce((total, { price, quantity }) => total + price * quantity, 0);
    setPrice(total);
  }, [selectedItems]);

  // Update selected items and price based on checkbox change
  const handleCheckboxChange = (itemId: string, itemPrice: number, isChecked: boolean) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev };
      if (isChecked) {
        newSelectedItems[itemId] = { price: itemPrice, quantity: 1 };
      } else {
        delete newSelectedItems[itemId];
      }
      return newSelectedItems;
    });
  };

  // Update selected items and recalculate price based on quantity change
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };
      if (newQuantity === 0) {
        delete updatedItems[itemId];
      } else if (updatedItems[itemId]) {
        updatedItems[itemId].quantity = newQuantity;
      }
      return updatedItems;
    });
  };

  // Recalculate total price whenever selectedItems changes
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedItems, calculateTotalPrice]);

  const navigate = useNavigate();

  const items = [
    { id: '01', name: 'Cheese Pizza', description: 'Indulge in our classic Cheese Pizza', price: 3500 },
    { id: '02', name: 'Saussage Pizza', description: 'Indulge in our classic Saussage Pizza', price: 4500 },
    { id: '03', name: 'Margherita Pizza', description: 'Indulge in our classic Margherita Pizza', price: 3000 },
    { id: '04', name: 'BBQ Chicken Pizza', description: 'Indulge in our BBQ Chicken Pizza', price: 4000 },
    { id: '05', name: 'Black Chicken Pizza', description: 'Indulge in our Black Chicken Pizza', price: 4000 },
    { id: '06', name: 'Hot & Spicy Chicken Pizza', description: 'Indulge in our Hot & Spicy Chicken Pizza', price: 4000 },
  ];

  const alsoBoughtItems = [
    { id: '01', name: 'Cheese Pizza', description: 'Indulge in our classic Cheese Pizza', price: 3500 },
    { id: '02', name: 'Saussage Pizza', description: 'Indulge in our classic Saussage Pizza', price: 4500 },
    { id: '03', name: 'Margherita Pizza', description: 'Indulge in our classic Margherita Pizza', price: 3000 },
  ];

  return (
    <div>
      <div className="text-4xl dark:text-white text-foodbg mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Cart</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Not ready to checkout? Continue Shopping
      </div>

      <section className="antialiased dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {/* Card set start */}
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl dark:border dark:border-foodbg dark:bg-foodbg p-2 shadow-sm md:px-6 backdrop-blur-md"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)'}}
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Checkbox
                        radius="full"
                        color="warning"
                        className="text-foodbg"
                        onChange={(e) => handleCheckboxChange(item.id, item.price, e.target.checked)}
                      ></Checkbox>
                      <a href="#" className="shrink-0 md:order-1">
                        <img className="h-30 w-30" src={Food} alt="food image" />
                      </a>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link to="#" color="foreground" className="text-xl dark:text-white text-foodbg">
                          <b>{item.name}</b>
                        </Link>
                        <p>{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <QtySelector
                            quantity={selectedItems[item.id]?.quantity || 1}
                            onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                          />
                        </div>

                        <div className="text-end md:order-4 md:w-10">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            <span className="pr-2 text-orange-500">Rs.</span>
                            {item.price}
                          </p>
                        </div>

                        <div className="text-end md:order-5 md:w-30">X</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Card set end */}

              <div className="hidden xl:mt-8 xl:block">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  People also bought
                </h3>

                <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                  {alsoBoughtItems.map((item) => (
                    <div
                      key={item.id}
                      className="space-y-6 overflow-hidden rounded-xl dark:border border-gray-200 dark:bg-foodbg dark:border-foodbg p-6 shadow-sm backdrop-blur-md"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)' }}
                    >
                      <a href="#" className="overflow-hidden rounded">
                        <img className="mx-auto h-44 w-44" src={Food} alt="food image" />
                      </a>
                      <div>
                        <a href="#" className="text-xl font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                          {item.name}
                        </a>
                        <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          <span className="pr-2 text-orange-500">Rs.</span>
                          {item.price}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-2.5">
                        <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 px-10 inline-flex w-full items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-300">
                          <svg
                            className="-ms-2 me-2 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                            />
                          </svg>
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full sticky leading-normal">
              <div
                className="space-y-4 rounded-lg dark:border border-gray-200 dark:border-foodbg dark:bg-foodbg p-4 shadow-sm sm:p-6 backdrop-blur-md"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)'}}
              >
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4 pt-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">${price}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 pt-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-600">$0</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 pt-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 pt-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-5 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">${price}</dd>
                  </dl>
                </div>

                <Button
                  className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 px-10 inline-flex w-full items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-300 mt-8"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                  <a
                    href="/foodItems"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
