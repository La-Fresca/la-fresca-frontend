import React from 'react';

interface ModalProps {
  order?: any;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ order, onClose }) => {
  if (!order) return null;

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
            aria-label="Close Modal"
          >
            ✖
          </button>
        </div>

        {/* Content Section */}
        <div className="mb-4">
          <strong className="text-yellow-400">Waiter:</strong>{' '}
          <span className="text-gray-300">{order.waiter}</span>
        </div>
        <div className="mb-4">
          <strong className="text-yellow-400">Order:</strong>{' '}
          <span className="text-lg font-semibold text-yellow-500">
            {order.order}
          </span>
        </div>
        <div className="mb-4">
          <strong className="text-yellow-400">Customer:</strong>{' '}
          <span className="text-gray-300">{order.customer}</span>
        </div>
        <div className="mb-4">
          <strong className="text-yellow-400">Order Items:</strong>
          <ul className="list-disc list-inside text-gray-300 mt-2 pl-4">
            <li>Cheese Pizza</li>
            <li>Pepperoni Pizza</li>
            <li>Coke</li>
          </ul>
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
