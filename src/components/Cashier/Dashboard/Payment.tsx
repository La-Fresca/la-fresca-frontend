import React, { useState } from 'react';

const PaymentMethodSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState('Cash');

  const methods = [
    { name: ' Cash', icon: '💵' },
    { name: ' Card', icon: '💳' },
  ];

  return (
    <div className=" space-x-15 p-2 rounded-xl my-2 ml-11 ">
      {methods.map((method) => (
        <button
          key={method.name}
          className={`flex-col items-center p-2 rounded-xl justify-center border-2 
            ${
              selectedMethod === method.name
                ? 'bg-yellow-500 text-black font-medium border-2 border-white items-center'
                : 'bg-gray-900 text-white hover:bg-gray-700 items-center font-medium '
            }`}
          onClick={() => setSelectedMethod(method.name)}
        >
          <span className="text-2xl items-center">{method.icon}</span>
          <span className="mt-2 items-center">{method.name}</span>
        </button>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
