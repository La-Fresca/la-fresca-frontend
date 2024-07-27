import React from 'react';
import { FaHome, FaBoxOpen, FaUser } from 'react-icons/fa'; // Import the icons you need

export const BottomNav = () => {
  return (
    <div className="fixed z-50 w-[50%] h-16 max-w-lg -translate-x-1/2 bg-black border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <FaHome className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#FDB241] dark:group-hover:text-[#FDB241]" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </button>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#FDB241] rounded-full hover:bg-[#FDB241] group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <FaBoxOpen className="w-4 h-4 text-white" aria-hidden="true" />
            <span className="sr-only">Delivery</span>
          </button>
        </div>
        <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Delivery
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <FaUser className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#FDB241] dark:group-hover:text-[#FDB241]" aria-hidden="true" />
          <span className="sr-only">Profile</span>
        </button>
        <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
};
