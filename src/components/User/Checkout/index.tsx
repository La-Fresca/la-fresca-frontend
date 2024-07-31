import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function index() {
  const navigate = useNavigate();
  return (
    <section
      className="bg-white py-8 antialiased dark:bg-foodbg dark:border dark:border-foodbg backdrop-blur-md rounded-2xl md:py-16"
      style={{boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)', backgroundColor: 'rgba(255, 255, 255, 0.01)'}}
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
                    {' '}
                    Full name*
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
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    {' '}
                    Street address*
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="Street Address"
                    required
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    {' '}
                    City*
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    placeholder="City"
                    required
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label className="block text-sm font-medium text-foodbg dark:text-white">
                      {' '}
                      Province*{' '}
                    </label>
                  </div>
                  <select
                    id="select-country-input-3"
                    className="block w-full rounded-lg border border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <option hidden selected>
                      Province
                    </option>
                    <option value="W">Westrn</option>
                    <option value="E">Eastern</option>
                    <option value="N">Northern</option>
                    <option value="S">Southern</option>
                    <option value="C">Central</option>
                    <option value="NW">North Western</option>
                    <option value="NC">North Central</option>
                    <option value="U">Uva</option>
                    <option value="S">Sabaragamuwa</option>
                  </select>
                </div>

                {/* phone number */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    {' '}
                    Phone Number*{' '}
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

                          <path d="M61.8 28.7c-.8 0-1.5-.1-2.2-.1c.3.2-.8-3.5-.2-4c.7-.6.2-4.2-.4-5c0-.1 0-.3.1-.4c-.3-.7-.7-1.4-1.1-2c-1.1-.4-2-1.1-2.4.5c-.4-.5-1.5-1.6-2.2-1.3c-.1.4-.2.8-.4 1.2c-.5.2-2.3-.8-3.3-.6c0 2-1.2 1.2-2.6 1.9c-2.6 1.2-1.3-1.1-3-1.1c-3.2 0 1.3 4.9 2.1 5.4c.1-.2-.3-.6 0-.8c0 0 1.1.9 1.1.6c.1-.3.1-.6.3-.8c.3.5 2.6 3.2 2.1 3.7c-.1.1-2.3-.1-2.3-.1c.1-.2.2-.7.2-.8c-.7-.7-2-.8-2.7-.6c-.6.2-1.7 1-1.8 2c.4-.1 1.8-.5 2-.3c.1.1-.4.8-.4.9c.6 0 1.8.3 2.1.3c.1-.2.3-.5.4-.7c.3.4.5.8.8 1.3c.3.2.9-1.8 1.5-.4c.2.5-4.9 5.3-5.2 7.1c-.2 1 0 2 .4 2.9c-.9-1-3.3-3.7-3.9-3.4c-1.5.8-.2 5.4.5 6.3c.8 1.1 5.5 3.8 5.5.2c0-.2-.2-.5-.4-.9c1.1.7 2.5 1.3 3.1 2c.7.8 1.3 3 1.2 4.2c-.3 2.9-4.8.2-4.8 3.4c0-.4 4.4.2 4.7-.1c.7-.5 2.9 1.2 2.5-1.2c-.4-2.4 2.5-1.3 2.5-3.2c0-1-3.1.2-1.4-2.5c.7-1 .2-2.4 1-1.3c1.3 1.6 3.4.5 5.7-.7c.7-2.6 1.1-5.3 1.1-8.1c0-1.3-.1-2.4-.2-3.5"></path>

                          <path d="M40 41.8c-.2.7-1.2-3.1-1-3.3c.4.1.7.1 1.1.1c.3-.2-.7-.7-1.6-1c.8 0 1.5-.3 1.5-.5s-.4-.4-1.1-.5c.6-.1 1-.3 1-.5s-.5-.4-1.2-.5c.7-.1 1.3-.3 1.3-.5s-.3-.4-.8-.5c.6-.1 1-.3 1-.6c0-.2-.3-.4-.8-.5c.5-.1.9-.2 1.2-.3c1.7-1.8-.5-3-.5-1.1c0 .8-2.2.5-2.6.3c-.4-.2-.2-.4 0-.7c.4.2 2.2.5 2.3-2.1c.1-1.1.1-16.3 1.5-16.3c-5.9-.3-3.3 14.6-3.8 17.9c-.4-.7-2.1.1-1.6 1.2c.3.6 1 .9 1.7 1.1c-.5.1-.9.3-.9.5s.3.4.8.5c-.6.1-1 .3-1 .5s.5.4 1.2.5c-.7.1-1.3.3-1.3.5s.5.4 1.1.5c-.6.1-1 .3-1 .5s.3.4.8.5c-.4.1-.6.3-.6.6l1.2.6c0 .8-.4 2.5-.7 3.3c-.1-.3-.4-.4-.6-.5c-1.3.1 1 1.6 1 1.5c0 .5-.5.4-.7.7c0 0 1.6 1 1.6 1.2c.2-.2 1.5-1.1 1.6-1.2c-.2-.2-.7-.4-.7-.7c0-.2 1.3-.5 1.4-.9c.1-.4-.7-.8-.8-.3"></path>
                        </g>
                      </svg>
                      +94
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="phone-input"
                        className="block w-full border border-s-0 rounded-e-lg border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="12-3456789"
                        required
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foodbg dark:text-white">
                    {' '}
                    Postal / Zip code*
                  </label>
                  <input
                    type="text"
                    id="vat_number"
                    className="block w-full border rounded-lg border-[rgba(0,0,0,0.3)] hover:border-foodbg focus:border-foodbg dark:border-foodbg dark:bg-foodbg p-2.5 text-sm dark:text-white outline-none focus:dark:border-white hover:dark:border-white duration-200"pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    placeholder="Postal / Zip code"
                    required
                  />
                </div>

                {/* <div className="sm:col-span-2">
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
                    Add new address
                  </button>
                </div> */}
              </div>
            </div>

            {/* Card details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foodbg dark:text-white">
                Payment Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                {/* <div className="sm:col-span-2">
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
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                  Rs. 8,094.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-500">0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Delivery fee
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                  Rs. 99
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                  Rs. 8,392.00
                  </dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 px-10 py-5 inline-flex w-full items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-300 mt-2"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default index;
