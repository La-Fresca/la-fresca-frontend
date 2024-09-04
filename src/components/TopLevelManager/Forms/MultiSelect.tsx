import { FC } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Category } from '@/types/mock_category';
import { UseFormRegister } from 'react-hook-form';

interface AppProps {
  categories: Category[];
  fieldname: string;
  register: UseFormRegister<any>;
}

const App: FC<AppProps> = ({ categories, register, fieldname }) => {
  return (
    <div className="relative">
      <div>
        <div className="flex flex-col items-center">
          <select
            {...register('category')}
            className="hidden"
            id="category-select"
          >
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div className="w-full">
                <div className="mb-2 flex rounded border border-stroke py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark bg-inherit">
                  <div className="flex flex-auto flex-wrap gap-3">
                    <Select
                      items={categories}
                      placeholder="Select an option"
                      className="w-full"
                      {...register(fieldname)}
                    >
                      {(category) => (
                        <SelectItem
                          className="dark:bg-[#000000] bg-white rounded-sm border border-solid w-full dark:text-white text-[#000000]"
                          key={category.key}
                        >
                          {category.label}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
