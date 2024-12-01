import React, { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import md5 from 'md5'; // Install with: npm install md5 @types/md5

declare global {
  interface Window {
    payhere: any;
  }
}

interface PaymentProps {
  orderData: {
    id: string;
    totalAmount: number;
    location: string;
    contactNo: string;
    items: any[];
  };
  customerDetails: {
    name: string;
    email: string;
  };
  onOrderSubmit: () => Promise<void>; // Add this new prop
}

// Mock merchant secret (TESTING ONLY - NEVER DO THIS IN PRODUCTION!)
const MOCK_MERCHANT_SECRET =
  'MjI3MTM3NTY5MTkzOTA4NzM2MjExMDY5Njg1ODUxOTg3ODczMjk4';

const generatePaymentHash = (
  merchant_id: string,
  order_id: string,
  amount: string,
  currency: string,
) => {
  const formattedAmount = Number(amount).toFixed(2);
  const merchantSecret = MOCK_MERCHANT_SECRET;

  const secretHash = md5(merchantSecret).toUpperCase();
  const finalHash = md5(
    merchant_id + order_id + formattedAmount + currency + secretHash,
  ).toUpperCase();

  return finalHash;
};

const PaymentGateway: React.FC<PaymentProps> = ({
  orderData,
  customerDetails,
  onOrderSubmit,
}) => {
  useEffect(() => {
    // Load PayHere script
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const merchant_id = '1226577';
    const formattedAmount = orderData.totalAmount.toString();
    const currency = 'LKR';

    const hash = generatePaymentHash(
      merchant_id,
      orderData.id,
      formattedAmount,
      currency,
    );

    // Set up handlers before initiating payment
    if (window.payhere) {
      // Configure PayHere event handlers
      window.payhere.onCompleted = function (orderId) {
        console.log('Payment completed. OrderID:' + orderId);
        setTimeout(async () => {
          try {
            await onOrderSubmit();
          } catch (error) {
            console.error('Error submitting order:', error);
          }
        }, 2000);
      };

      window.payhere.onDismissed = function () {
        console.log('Payment dismissed');
      };

      window.payhere.onError = function (error) {
        console.log('Error:', error);
      };

      const payment = {
        sandbox: true,
        merchant_id,
        return_url: undefined, // Important: set to undefined for onCompleted to work
        cancel_url: undefined, // Important: set to undefined for onDismissed to work
        notify_url: 'http://localhost:8080/swagger-ui/index.html',
        order_id: orderData.id,
        items: orderData.items.map((item) => item.name).join(', '),
        amount: formattedAmount,
        currency,
        hash,
        first_name: customerDetails.name.split('  ')[0],
        last_name: customerDetails.name.split(' ')[1] || '',
        email: customerDetails.email,
        phone: orderData.contactNo,
        address: orderData.location,
        city: orderData.location.split(',').pop()?.trim() || '',
        country: 'Sri Lanka',
        delivery_address: orderData.location,
        delivery_city: orderData.location.split(',').pop()?.trim() || '',
        delivery_country: 'Sri Lanka',
      };

      // Start payment
      window.payhere.startPayment(payment);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      className="            bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 px-10 py-5 inline-flex w-full items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-300 mt-2"
    >
      Confirm Order
    </Button>
  );
};

export default PaymentGateway;
