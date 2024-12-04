import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUsers } from '@/api/useUser';

interface OrderItem {
  name: string;
  quantity: number;
  totalPrice: number;
  addedFeatures?: Array<{
    name: string;
    level: string;
    additionalPrice: number;
  }>;
}

interface ModalProps {
  order?: {
    id: string;
    waiterId: string;
    orderItems: OrderItem[];
    orderType: string;
    orderStatus: string;
    totalAmount: number;
    createdAt: string;
  };
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ order, onClose }) => {
  const { getWaiterById } = useUsers();

  const { data: waiters = [] } = useQuery({
    queryKey: ['waiters'],
    queryFn: getWaiterById,
  });

  if (!order) return null;

  const waiter = waiters.find((w) => w.id === order.waiterId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-slate-900 p-6 rounded-xl shadow-2xl w-full max-w-lg animate-fade-in border-2 border-yellow-500 drop-shadow-2xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 tracking-wide">
            Order Details
          </h2>
          <button
            className="text-yellow-500 hover:text-yellow-700 transition duration-200"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {waiter && (
            <div className="mb-4">
              <strong className="text-yellow-400">Waiter:</strong>{' '}
              <span className="text-gray-300">
                {`${waiter.firstName} ${waiter.lastName}`}
              </span>
            </div>
          )}

          <div className="mb-4">
            <strong className="text-yellow-400">Order ID:</strong>{' '}
            <span className="text-lg font-semibold text-yellow-500">
              {order.id}
            </span>
          </div>

          <div className="mb-4">
            <strong className="text-yellow-400">Order Status:</strong>{' '}
            <span className="text-gray-300">{order.orderStatus}</span>
          </div>

          <div className="mb-4">
            <strong className="text-yellow-400">Order Items:</strong>
            <ul className="list-disc list-inside text-gray-300 mt-2 pl-4">
              {order.orderItems.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.name} x{item.quantity} - Rs.{item.totalPrice}
                  {item.addedFeatures && item.addedFeatures.length > 0 && (
                    <ul className="list-none ml-4 text-sm text-gray-400">
                      {item.addedFeatures.map((feature, idx) => (
                        <li key={idx}>
                          {feature.name}: {feature.level} (+Rs.
                          {feature.additionalPrice})
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong className="text-yellow-400">Total Amount:</strong>{' '}
            <span className="text-lg font-semibold text-yellow-500">
              Rs.{order.totalAmount}
            </span>
          </div>

          <div className="mb-4">
            <strong className="text-yellow-400">Created At:</strong>{' '}
            <span className="text-gray-300">{order.createdAt}</span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-end">
          <button
            className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-medium mt-4 shadow-md transition duration-300 transform hover:bg-yellow-600 hover:-translate-y-1 hover:shadow-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
