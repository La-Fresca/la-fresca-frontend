import { Item } from '@/types/item';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MinusIcon } from '@heroicons/react/24/solid';
import PaymentMethodSelector from '@components/Cashier/Dashboard/Payment';
// import Logo from '@images/logo/la-fresca.png';
// import { CrossIcon } from 'node_modules/react-select/dist/declarations/src/components/indicators';

interface OrderDetailsProps {
  order: OrderItem[];
  removeItemFromOrder: (itemName: string) => void;
  calculateTotal: () => string;
  reduceItemQuantity: (itemName: string) => void;
  calculateItemCount: () => number;
  onSubmitOrder: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  removeItemFromOrder,
  reduceItemQuantity,
  calculateTotal,
  calculateItemCount,
  onSubmitOrder,
}) => {
  return (
    <section className="w-1/3 p-4 rounded-xl shadow-lg bg-gray ml-5 h-[120vh]">
      {/* <div className="flex items-center bg-transparent p-4 ml-15">
      <img src={Logo} alt="La Fresca Logo" className="h-10 w-10 mr-2" />
      <span className="text-black dark:text-white text-2xl font-noto-serif">La Fresca</span>

    </div> */}
      <h2 className="text-2xl font-semibold mt-2  mb-8 text-center">
        Order Details
      </h2>
      <div className="width-[100%] mt-2 !overflow-scroll h-[60vh] px-2">
        <ul>
          {order.length === 0 && (
            <h2 className="text-2xl text-yellow-500 italic text-center">
              "No items in the order yet"
            </h2>
          )}
          {order.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 p-2 bg-yellow-400 bg-opacity-15 rounded-xl"
            >
              <div>
                <h3 className="text-base font-bold ">
                  {item.name}{' '}
                  <span className="text-sm text-gray-400">
                    x{item.quantity}
                  </span>
                </h3>
                <p className="text-orange-600">
                  LKR {(item.price * item.quantity).toFixed(2)}
                </p>
                {item.addedFeatures && item.addedFeatures.length > 0 && (
                  <div className="text-xs text-gray-400">
                    {item.addedFeatures.map(
                      (feature, idx) =>
                        feature.level !== '0' &&
                        feature.level !== '-1' && (
                          <div key={idx}>
                            {feature.name}: Level {feature.level} (+
                            {feature.additionalPrice})
                          </div>
                        ),
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => removeItemFromOrder(item.name)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded transition duration-300 mr-3"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={() => reduceItemQuantity(item.name)}
                  className="bg-orange-400 hover:bg-orange-300 text-white py-1 px-2 rounded transition duration-300"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-lg">Total:LKR {calculateTotal()}</p>
        <p className="text-sm">Total Discount:None</p>
        <p className="text-sm">Number Of Items:{calculateItemCount()}</p>
        <h2 className="mt-5 font-semibold">Payment Methods</h2>
        <PaymentMethodSelector />
        <button
          onClick={onSubmitOrder}
          className="mt-2 w-full bg-gradient-to-r from-orange-600 to-orange-400  text-white py-2 rounded-lg shadow-lg transition duration-300 hover:from-orange-950 hover:to-orange-700"
        >
          Pay LKR.{calculateTotal()}
        </button>
        {/* <button
          
          className="mt-2 w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white py-2 rounded-lg shadow-lg transition duration-300 hover:from-orange-950 hover:to-orange-700"
        >
          Submit Order
        </button> */}
      </div>
    </section>
  );
};

export default OrderDetails;
