import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '@images/logo/la-fresca.png';
import BurgerIcon from '@images/icon/burger.png';
import BurgerIconWhite from '@images/icon/burger-white.png';
import BurgerFriesIcon from '@images/icon/burger-fries.png';
import BurgerFriesIconWhite from '@images/icon/burger-fries-white.png';
import DiscountIcon from '@images/icon/discount.png';
import DiscountIconWhite from '@images/icon/discount-white.png';
import InventoryIcon from '@images/icon/inventory.png';
import InventoryIconWhite from '@images/icon/inventory-white.png';
import StockIcon from '@images/icon/stock.png';
import StockIconWhite from '@images/icon/stock-white.png';
import ReportIcon from '@images/icon/report.png';
import ReportIconWhite from '@images/icon/report-white.png';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
 
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
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
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
          <Bars3Icon className="w-6 h-6" />
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
                  to="/top-level-manager"
                  className={`group relative flex items-center gap-2.5 rounded-xl px-4 py-2 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    (pathname === '/top-level-manager' ||
                      pathname.includes('dashboard')) &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <Squares2X2Icon className="w-6 h-6" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="branches"
                  className={`group relative flex items-center gap-2.5 rounded-xl px-4 py-2 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    (pathname === '/sales' || pathname.includes('branches')) &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <BuildingOffice2Icon className="w-6 h-6" />
                  Branches
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/top-level-manager/categories"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/categories') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <TagIcon className="w-6 h-6" />
                  Categories
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/top-level-manager/foods"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/foods') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img src={BurgerIcon} alt="" className="w-6 h-6 dark:hidden block" />
                  <img src={BurgerIconWhite} alt="" className="w-6 h-6 dark:block hidden" />
                  Food Items
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/top-level-manager/food-combos"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/food-combos') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img src={BurgerFriesIcon} alt="" className="w-6 h-6 dark:hidden block" />
                  <img src={BurgerFriesIconWhite} alt="" className="w-6 h-6 dark:block hidden" />
                  Food Combos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/top-level-manager/discountlist"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/discountlist') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img src={DiscountIcon} alt="" className="w-6 h-6 dark:hidden block" />
                  <img src={DiscountIconWhite} alt="" className="w-6 h-6 dark:block hidden" />
                  Discount List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/top-level-manager/inventory"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/inventory') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img src={InventoryIcon} alt="" className="w-6 h-6 dark:hidden block" />
                  <img src={InventoryIconWhite} alt="" className="w-6 h-6 dark:block hidden" />
                  Inventory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/top-level-manager/stock"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/stock') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img src={StockIcon} alt="" className="w-6 h-6 dark:hidden block" />
                  <img src={StockIconWhite} alt="" className="w-6 h-6 dark:block hidden" />
                  Stocks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/top-level-manager/report"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/report') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img src={ReportIcon} alt="" className="w-6 h-6 dark:hidden block" />
                  <img src={ReportIconWhite} alt="" className="w-6 h-6 dark:block hidden" />
                  Reports
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/top-level-manager/users"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/top-level-manager/users') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <img src={ReportIcon} alt="" className="w-6 h-6 dark:hidden block" />
                  <img src={ReportIconWhite} alt="" className="w-6 h-6 dark:block hidden" />
                  Branch Managers
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
