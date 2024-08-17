import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <Link
      className="flex flex-col pl-4 pr-0 pt-2 pb-2 dark:bg-meta-4 items-center justify-center rounded-full border-[0.5px] bg-stroke border-stroke dark:border-strokedark scale-95"
      to="/cart"
    >
      <svg
        className="-ms-2 me-2 h-5 w-5 fill-current duration-300 ease-in-out text-[#0000003d] dark:text-[#ffffff83]"
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
          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
        />
      </svg>
    </Link>
  );
};

export default Cart;
