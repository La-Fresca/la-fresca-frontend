import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '@images/logo/la-fresca.png';
import {
  Bars3Icon,
  UserIcon,
  ClockIcon,
  Squares2X2Icon,
  PhotoIcon,
  ReceiptPercentIcon,
} from '@heroicons/react/24/outline';
import BurgerFriesIcon from '@images/icon/burger-fries.png';
import BurgerFriesIconWhite from '@images/icon/burger-fries-white.png';
import DiscountIcon from '@images/icon/discount.png';
import DiscountIconWhite from '@images/icon/discount-white.png';
import { CakeIcon } from '@heroicons/react/24/outline';
import { QueueListIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { RectangleGroupIcon, TagIcon } from '@heroicons/react/24/solid';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col lg:hidden overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-4 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: '55px', height: '55px' }}
          />
          <span className="ml-2 text-3xl text-black dark:text-white font-bold">
            La Fresca
          </span>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5 translate-y-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-xl px-4 py-2 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    (pathname === '/branch-manager' ||
                      pathname.includes('dashboard')) &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <Squares2X2Icon className="w-6 h-6" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menuItems"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/menuItems') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img
                    src={BurgerFriesIcon}
                    alt=""
                    className="w-6 h-6 dark:hidden block"
                  />
                  <img
                    src={BurgerFriesIconWhite}
                    alt=""
                    className="w-6 h-6 dark:block hidden"
                  />
                  Foods
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orderhistory"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/orderhistory') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <ClockIcon className="w-6 h-6" />
                  Order History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/gallery') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <PhotoIcon className="w-6 h-6" />
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/promotions"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/promotions') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img
                    src={DiscountIcon}
                    alt=""
                    className="w-6 h-6 dark:hidden block"
                  />
                  <img
                    src={DiscountIconWhite}
                    alt=""
                    className="w-6 h-6 dark:block hidden"
                  />
                  Discount List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactUs"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/contactUs') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <UserIcon className="w-6 h-6" />
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
