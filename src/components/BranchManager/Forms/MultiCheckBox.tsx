import { FC, useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Category } from '@/types/category';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface AppProps {
  categories: Category[];
  fieldname: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

const App: FC<AppProps> = ({ categories, register, fieldname, setValue }) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  let value = Array.from(selectedKeys);

  useEffect(() => {
    setValue(fieldname, Array.from(selectedKeys));
    console.log(/*selectedKeys*/ Array.from(selectedKeys));
    console.log(value);
  }, [selectedKeys, setValue, fieldname]);

  const handleSelectionChange = (keys: Set<string> | any) => {
    setSelectedKeys(keys instanceof Set ? keys : new Set(keys)); // Ensure keys is always a Set<string>
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="mb-2 flex rounded border border-stroke py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark bg-inherit">
            <Select
              items={categories}
              placeholder="Select an option"
              className="w-full"
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              labelPlacement="outside"
              classNames={{
                base: 'max-w-full',
                trigger: 'min-h-12 py-2',
              }}
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) => handleSelectionChange(keys)}
            >
              {(category) => (
                <SelectItem
                  className="dark:bg-[#000000] bg-white rounded-sm border border-solid w-full dark:text-white text-[#000000]"
                  key={category.key}
                  value={category.key}
                >
                  {category.label}
                </SelectItem>
              )}
            </Select>
            <input type="hidden" value={value} {...register(fieldname)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
