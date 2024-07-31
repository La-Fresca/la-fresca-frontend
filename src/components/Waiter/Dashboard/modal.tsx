import React from 'react';

interface ModalProps {
  order?: any;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white text-green p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="font-bold text-lg mb-4">Order Details</div>
        <div className="mb-2">
          <strong>Waiter:</strong> {order.waiter}
        </div>
        <div className="mb-2 font-bold text-2xl text-yellow-500">
          <strong>Order:</strong> {order.order}
        </div>
        <div className="mb-2">
          <strong>Customer:</strong> {order.customer}
        </div>
        <div className="mb-2">
          <strong>orderItems:</strong> cheese pizza, pepperoni pizza, coke
        </div>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 transition transform hover:bg-gray-700 hover:-translate-y-1"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
