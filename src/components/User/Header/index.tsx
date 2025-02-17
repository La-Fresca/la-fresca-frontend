import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import LogoIcon from '@/images/logo/la-fresca.png';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const links = [
    { name: 'Home', href: '/', showOnLarge: true },
    { name: 'Foods', href: '/menuItems', showOnLarge: true },
    { name: 'Order History', href: '/orderHistory', showOnLarge: true },
    { name: 'Gallery', href: '/gallery', showOnLarge: true },
    { name: 'Promotions', href: '/promotions', showOnLarge: true },
    { name: 'Contact Us', href: '/contactUs', showOnLarge: true },
  ];

  return (
    <header className="sticky top-0 z-999 flex w-full drop-shadow-none dark:drop-shadow-none backdrop-blur-xl">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* <!-- Hamburger Toggle BTN --> */}
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-99999 block rounded-sm p-1.5 shadow-sm lg:hidden"
        >
          <span className="relative block h-5.5 w-5.5 cursor-pointer">
            <span className="du-block absolute right-0 h-full w-full">
              <span
                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!w-full delay-300'
                }`}
              ></span>
              <span
                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && 'delay-400 !w-full'
                }`}
              ></span>
              <span
                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!w-full delay-500'
                }`}
              ></span>
            </span>
            <span className="absolute right-0 h-full w-full rotate-45">
              <span
                className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!h-0 !delay-[0]'
                }`}
              ></span>
              <span
                className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!h-0 !delay-200'
                }`}
              ></span>
            </span>
          </span>
        </button>
        {/* <!-- Hamburger Toggle BTN --> */}
        
        <div className="hidden sm:flex items-center">
          <div
            className="text-black font-bold pl-2 pr-12 dark:text-white mr-4 flex items-center"
            style={{ fontFamily: '', fontSize: '30px' }}
          >
             <img className="h-[40px] w-[40px]" src={LogoIcon} alt="Background" />
            <span className="ml-5">La Fresca</span>
          </div>
        </div>

        <div className="flex flex-grow items-center justify-center gap-5">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`text-foodbg dark:text-white hover:text-warning dark:hover:text-warning transition duration-300 ease-in-out ${link.showOnLarge ? 'hidden lg:block' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <ul className="flex items-center gap-2 2xsm:gap-4"> */}
          {/* <!-- Dark Mode Toggler --> */}

          {/* <!-- Dark Mode Toggler --> */}

          {/* <!-- Notification Menu Area --> */}
          {/* </ul> */}

          {/* <!-- User Area --> */}
          <ul className="flex items-center gap-3 2xsm:gap-7">
            <DropdownUser />
            <DarkModeSwitcher />
            <Cart />
            <DropdownNotification />
          </ul>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
