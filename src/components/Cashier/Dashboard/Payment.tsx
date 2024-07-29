import React, { useState } from 'react';

const PaymentMethodSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState('Cash');

  const methods = [
    { name: ' Cash', icon: '💵' },
    { name: ' Card', icon: '💳' },
    { name: ' Wallet', icon: '👛' },
  ];

  return (
    <div className=" space-x-4 p-2 rounded-xl my-5 ml-3 ">
      {methods.map((method) => (
        <button
          key={method.name}
          className={`flex-col items-center p-2 rounded-xl justify-center border  
            ${
              selectedMethod === method.name
                ? 'bg-white text-black'
                : 'bg-gray-900 text-white hover:bg-gray-700 items-center'
            }`}
          onClick={() => setSelectedMethod(method.name)}
        >
          <span className="text-2xl">{method.icon}</span>
          <span className="mt-2">{method.name}</span>
        </button>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
