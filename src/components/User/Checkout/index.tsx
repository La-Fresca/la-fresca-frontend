import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrders } from '@/api/useOrder';
import { Order } from '@/types/order';
import { OrderItem } from '../OrderHistory/OrderItem';
import PaymentGateway from '../PaymentGateway';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function Checkout() {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { createOrder } = useOrders();
  const [isEditable, setIsEditable] = useState(false);

  console.log(auth);

  // Add state for user details
  const [userDetails, setUserDetails] = useState({
    email: auth?.email || '',
    name: auth?.name || '',
  });

  const [address, setAddress] = useState({
    street: '',
    city: '',
    phoneNumber: '',
  });

  const orderData: Order = location.state?.orderData;

  if (!orderData) {
    navigate('/');
    return null;
  }

  const handleButtonClick = () => {
    setIsEditable((prev) => !prev);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [id === 'street_address'
        ? 'street'
        : id === 'city'
          ? 'city'
          : 'phoneNumber']: value,
    }));
  };

  const handleSubmitOrder = async () => {
    try {
      const finalOrderData = {
        ...orderData,
        location: `${address.street}, ${address.city}`,
        contactNo: `0${address.phoneNumber}`,
      };

      await createOrder(finalOrderData);
      navigate('/orderhistory');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <section
      className="bg-white py-8 antialiased dark:bg-foodbg dark:border dark:border-foodbg backdrop-blur-md rounded-2xl md:py-16"
      style={{
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
      }}
    >
      <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-white sm:text-base">
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-warning text-warning dark:after:border-warning after:border-warning sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Cart
            </span>
          </li>

          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-warning text-warning dark:after:border-white after:border-foodbg dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Checkout
            </span>
          </li>

          <li className="flex shrink-0 items-center text-foodbg dark:text-white">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Payment
          </li>
        </ol>

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            {/* Delivery details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foodbg dark:text-white">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="example@email.com"
                    required
                    disabled={isEditable}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    Customer Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="Full Name"
                    required
                    disabled={isEditable}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    Street address*
                  </label>
                  <input
                    type="text"
                    id="street_address"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="Street Address"
                    required
                    disabled={isEditable}
                    value={address.street}
                    onChange={handleAddressChange}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="City"
                    required
                    disabled={isEditable}
                    value={address.city}
                    onChange={handleAddressChange}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    Phone Number*
                  </label>
                  <div className="flex items-center">
                    <div
                      id="dropdown-phone-button-3"
                      data-dropdown-toggle="dropdown-phone-3"
                      className="z-10 inline-flex shrink-0 items-center rounded-s-lg border px-4 py-[5px] text-center text-sm font-medium text-gray-900 outline-none focus:ring-4 focus:ring-gray-100 dark:border-foodbg border-[rgba(0,0,0,0.3)] dark:text-white"
                    >
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 80 64"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          d="M29.2 8H50c-5-3.8-11.2-6-18-6c-6.8 0-13 2.2-18 6h11.6v48H14c5 3.8 11.2 6 18 6c6.8 0 13-2.2 18-6H29.2V8z"
                          fill="#ffce31"
                        ></path>

                        <path
                          d="M62 32c0-9.8-4.7-18.5-12-24H29.2v48H50c7.3-5.5 12-14.2 12-24"
                          fill="#c94747"
                        ></path>

                        <path
                          d="M25.6 8H14c-.1.1-.3.2-.4.3v47.4c.1.1.3.2.4.3h11.6V8"
                          fill="#ff8736"
                        ></path>

                        <path
                          d="M2 32c0 9.6 4.5 18.2 11.6 23.7V8.3A29.9 29.9 0 0 0 2 32z"
                          fill="#699635"
                        ></path>

                        <g fill="#ffce31">
                          <path d="M34.4 49.6c-1.1.8-3.2.7-4.1 1.7c-1.1 1.1.1 2.5.1 2.7l-.1.8s.7 0 1.1.1c.5.1.7.5 1.5.4c2.2-.1 2.1-2.1 2.2-3.8c.1-.6.4-1.5.5-2.1c.1-.6.2-1.4.2-1.4c0-.3-.7 1.1-1.4 1.6"></path>

                          <path d="M35.1 12.7c-.1-1.7 0-3.7-2.2-3.8c-.9-.1-1.1.3-1.5.4c-.3 0-1.1.1-1.1.1l.1.8c0 .1-1.2 1.6-.1 2.7c.9.9 3.1.9 4.1 1.7c.7.5 1.4 1.8 1.4 1.8s0-.9-.2-1.4c-.1-.8-.4-1.7-.5-2.3"></path>

                          <path d="M61.8 28.7c-.8 0-1.5-.1-2.2-.1c.3.2-.8-3.5-.2-4c.7-.6.2-4.2-.4-5c0-.1 0-.3.1-.4c-.3-.7-.7-1.4-1.1-2c-1.1-.4-2-1.1-2.4.5c-.4-.5-1.5-1.6-2.2-1.3c-.1.4-.2.8-.4 1.2c-.5.2-2.3-.8-3.3-.6c0 2-1.2 1.2-2.6 1.9c-2.6 1.2-1.3-1.1-3-1.1c-3.2 0 1.3 4.9 2.1 5.4c.1-.2-.3-.6 0-.8c0 0 1.1.9 1.1.6c.1-.3.1-.6.3-.8c.3.5 2.6 3.2 2.1 3.7c-.1.1-2.3-.1-2.3-.1c.1-.2.2-.7.2-.8c-.7-.7-2-.8-2.7-.6c-.6.2-1.7 1-1.8 2c.4-.1 1.8-.5 2-.3c.2.2-.3 1.3-.4 1.5c-1.1 1.6-.6.5-.8 1.7c-.2 1.3-.2 2.3 0 3.5c.3 2.5.5 3.4.4 6.1c-.2 5.3-1.4 4.4-1.3 7.7c.1 1.9.6 4 .9 5.9c.2 1 .1 2.3 1 2.6c.5.2 1.1-.2 1.5.1c.5.4.1 1.4.4 1.8c.4.5 2 .4 2.3.9c.5.9.1 2.2.3 3.1c.2.9.4 2.2.9 3.1c.4.8 1.2 1.5 2 2c.7.4 1.7 1.1 2.4 1.4c.6.2 1.7 0 2.4.1c.6.1 1.1.4 1.5.9c.8.8 2.1 1.8 3.2 1.8c.7 0 2-.7 2-1.6c0-1.1-1.8-.6-1.8-2.6c0-1.4.5-2.6-.3-3.8c-.6-.9-2-2.1-2.8-3.2c-.5-.7-.5-1.5-1.1-2.2c-.5-.7-2.6-1.4-3-2.1c-.1-.2-.2-.8-.1-1c.2-.5.4-.9.6-1.4c1.2-3 .7-2.2 1.1-5.3c.4-2.8.6-5.6.6-8.5c0-2.2 1.6-4.7 1.8-7c.2-2 .6-3.8 1.4-5.7c.7-1.7 2-4.3 1.9-6.1c0-1.6-.4-3.2-1.4-4.4c-.2-.3-.5-.3-.7-.5c-.5-.3-.6-1-.9-1.5c-.4-.7-.4-1.7-.5-2.4c0-.5 0-1-.3-1.4c-.2-.4-1.1-1.5-1.7-1.6c-.3 0-.7 0-1-.1z"></path>
                        </g>

                        <path
                          fill="#fff"
                          d="M54.9 37.6c-.2.1-2.2-.5-2.4-.5c-.2 0-1.4-1-1.6-1.1c-.2-.1-1.7-.4-1.7-.3c.1.1 1.2 2.7 1.3 2.7c0 0-2.3 1-2.4 1.3c0 .1.5 1.4.7 1.4c.1 0 2.6-1 2.7-1c.1 0 1.1.4 1.3.6c.2.2 1.3 2.2 1.4 2.2c.1 0 1.2-1.1 1.3-1.4c.1-.3-1.2-2.5-1.4-2.7c-.1-.2-.9-.7-.9-.7l2.6-1.4c0-.1-.7-1.4-.9-1.4z"
                        ></path>
                      </svg>
                      +94
                      {/* <svg
                        className="h-2.5 w-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg> */}
                    </div>
                    <input
                      type="text"
                      id="phone_number"
                      className="rounded-e-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg block w-full p-2.5 text-sm text-gray-900 outline-none dark:text-white focus:dark:border-white hover:dark:border-white duration-200"
                      placeholder="Phone Number"
                      required
                      disabled={isEditable}
                      value={address.phoneNumber}
                      onChange={handleAddressChange}
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="w-[100%] h-[200px] rounded-xl bg-foodbg outline-none active:outline-none focus:outline-none"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d632.9410776134524!2d79.86108248734442!3d6.9020645252537935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25963120b1509%3A0x2db2c18a68712863!2sUniversity%20of%20Colombo%20School%20of%20Computing%20(UCSC)!5e0!3m2!1sen!2slk!4v1723190413279!5m2!1sen!2slk"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl h-[200px] w-[100%] outline-none active:outline-none focus:outline-none"
                ></iframe>
              </div>

              <button
                onClick={handleButtonClick}
                className="bg-foodbg text-white px-4 py-2 rounded-lg mt-4"
              >
                {isEditable ? 'Save' : 'Edit'}
              </button>
            </div>

            {/* Card details */}
            <div className="space-y-4">
              {/* <h2 className="text-xl font-semibold text-foodbg dark:text-white">
                Payment Details
              </h2> */}

              {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    {' '}
                    Cardholder name*
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="Bonnie Green"
                    required
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                      {' '}
                      Country*{' '}
                    </label>
                  </div>
                  <select
                    id="select-country-input-3"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <option hidden selected className="">
                      Card Type
                    </option>
                    <option value="AS">VISA</option>
                    <option value="FR">Master</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    {' '}
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="135364958481"
                    required
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                      {' '}
                      Expire date*
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      className="block w-[95%] rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                      {' '}
                      CVV*
                    </label>
                    <input
                      type="text"
                      id="vat_number"
                      className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border dark:border-foodbg dark:bg-foodbg hover:dark:border-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 duration-200"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                    Add Card
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          <div
            id="payhere-modal"
            className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md"
          >
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    LKR {orderData?.totalAmount}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    Rs. 0
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Delivery fee
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    Rs. 0
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    LKR {orderData?.totalAmount}
                  </dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              {/* <Button
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 px-10 py-5 inline-flex w-full items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-300 mt-2"
                onClick={handleSubmitOrder}
              >
                Confirm Order
              </Button> */}
              <PaymentGateway
                orderData={{
                  id: orderData?.id,
                  location: `${address.street}, ${address.city}`,
                  contactNo: `0${address.phoneNumber}`,
                  totalAmount: orderData?.totalAmount,
                  items: orderData?.items || [],
                }}
                customerDetails={{
                  name: userDetails.name,
                  email: userDetails.email,
                }}
                onOrderSubmit={handleSubmitOrder} // Add this prop
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
