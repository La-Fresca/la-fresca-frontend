import { Product } from '@/types/product';
import Pizza from '@/images/product/pizza.png';
import MilkShake from '@/images/product/milkshake.png';

const productData: Product[] = [
  {
    image: Pizza,
    name: 'Cheese Pizza',
    category: 'Non-Vegetarian',
    remaining: 296,
    turnover: 22,
    increase: 45,
  },
  {
    image: MilkShake,
    name: 'Milkhake',
    category: 'Vanilla',
    remaining: 296,
    turnover: 22,
    increase: 2.9,
  },
  {
    image: Pizza,
    name: 'Mushroom Pizza',
    category: 'Vegetarian',
    remaining: 296,
    turnover: 22,
    increase: 3.9,
  },
  {
    image: Pizza,
    name: 'Tasty Pizza',
    category: 'Non-Vegetarian',
    remaining: 296,
    turnover: 22,
    increase: 10.7,
  },
];

const TableTwo = () => {
  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Best Selling Products
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Remaining</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Turn Over</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Increase By</p>
          </div>
        </div>

        {productData.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img src={product.image} alt="Product" />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {product.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.category}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                LKR {product.remaining}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.turnover}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-meta-3">%{product.increase}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;
