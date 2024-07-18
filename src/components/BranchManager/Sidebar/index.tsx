import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '@images/logo/la-fresca.png';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { CakeIcon } from '@heroicons/react/24/outline';
import { QueueListIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/solid';

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
                  to="/branch-manager"
                  className={`group relative flex items-center gap-2.5 rounded-xl px-4 py-2 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    (pathname === '/branch-manager' ||
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
                  to="/branch-manager/categories"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/branch-manager/categories') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <TagIcon className="w-6 h-6" />
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/branch-manager/foods"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/branch-manager/foods') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <CakeIcon className="w-6 h-6" />
                  Foods
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/branch-manager/users"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                    pathname.includes('/branch-manager/users') &&
                    'bg-yellow-100 dark:bg-meta-4'
                  }`}
                >
                  <UserIcon className="w-6 h-6" />
                  Manage Users
                </NavLink>
              </li>
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/branch-manager/forms' ||
                  pathname.includes('/branch-manager/forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium  text-black dark:text-white duration-300 ease-in-out hover:bg-yellow-100 dark:hover:bg-meta-4 ${
                          (pathname === '/branch-manager/forms' ||
                            pathname.includes('forms')) &&
                          'bg-yellow-100 dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <QueueListIcon className="w-6 h-6" />
                        Forms
                        <span className="ml-auto">
                          {open ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          )}
                        </span>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/branch-manager/forms/form-elements"
                              className={({ isActive }) =>
                                'group relative flex items-center h-10 gap-2.5 rounded-lg px-4 font-medium hover:bg-yellow-100 hover:dark:bg-meta-4 text-black dark:text-white duration-300 ease-in-out' +
                                isActive
                              }
                            >
                              Form Elements
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/branch-manager/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center h-10 gap-2.5 rounded-lg px-4 font-medium hover:bg-yellow-100 hover:dark:bg-meta-4 text-black dark:text-white duration-600 ease-in-out ' +
                                isActive
                              }
                            >
                              Form Layout
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
