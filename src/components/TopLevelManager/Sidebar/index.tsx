import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '@images/logo/la-fresca.png';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { CakeIcon } from '@heroicons/react/24/outline';
import {
  ChartBarSquareIcon,
  RectangleGroupIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/react/24/solid';

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
                  <ChartBarSquareIcon className="w-6 h-6" />
                  Branches
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="inventory"
                  className={`group relative flex items-center gap-2.5 rounded-xl px-4 py-2 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    (pathname === '/inventory' || pathname.includes('inventory')) &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <ChartBarSquareIcon className="w-6 h-6" />
                  Inventory
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
