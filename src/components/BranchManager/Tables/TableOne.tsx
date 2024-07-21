import { BRAND } from '@/types/brand';
import ProductOne from '@images/product/pizza.png';
import ProductTwo from '@images/product/milkshake.png';

const brandData: BRAND[] = [
  {
    logo: ProductOne,
    name: 'Cheeze Pizza',
    revenues: '5,768',
  },
  {
    logo: ProductTwo,
    name: 'Milk Shake',
    revenues: '4,635',
  },
  {
    logo: ProductOne,
    name: 'Mushroom Pizza',
    revenues: '4,290',
  },
  {
    logo: ProductOne,
    name: 'Tasty Pizza',
    revenues: '3,768',
  },
];

const TableOne = () => {
  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="rounded-sm  bg-white px-5 pt-6 pb-2.5 shadow-default  dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Most Ordered foods
        </h4>

        <div className="flex flex-col justify-between">
          {/* <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Source
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Revenues
              </h5>
            </div>
          </div> */}

          {brandData.map((brand, key) => (
            <div
              className={`grid grid-cols-2 sm:grid-cols-2 ${
                key === brandData.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-2 p-2.5 xl:p-5">
                <div className="flex-shrink-0 object-scale-down h-10 w-10">
                  <img src={brand.logo} alt="Brand" />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {brand.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">${brand.revenues}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
