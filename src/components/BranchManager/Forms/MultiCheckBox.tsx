import { FC, useState, useEffect } from 'react';
import { Select, SelectItem, Chip, SelectedItems } from '@nextui-org/react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

type ComboPicker = {
  key: string;
  label: string;
};

interface AppProps {
  categories: ComboPicker[];
  fieldname: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const App: FC<AppProps> = ({ categories, register, fieldname, setValue }) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [chipColors, setChipColors] = useState<{ [key: string]: string }>({});
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  useEffect(() => {
    const labels = Array.from(selectedKeys).map(
      (key) => categories.find((category) => category.key === key)?.label || '',
    );
    setSelectedLabels(labels);
    setValue(fieldname, labels);
  }, [selectedKeys, setValue, fieldname, categories]);

  const handleSelectionChange = (keys: Set<string> | any) => {
    const newKeys = keys instanceof Set ? keys : new Set(keys);
    const newChipColors = { ...chipColors };

    newKeys.forEach((key) => {
      if (!chipColors[key]) {
        newChipColors[key] = getRandomColor();
      }
    });

    setChipColors(newChipColors);
    setSelectedKeys(newKeys);
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
              renderValue={(items: SelectedItems<ComboPicker>) => (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip
                      key={item.key}
                      className={`${chipColors[String(item.key)]} bg-opacity-25`}
                    >
                      {item.textValue}
                    </Chip>
                  ))}
                </div>
              )}
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
            <input
              type="hidden"
              value={selectedLabels.join(',')}
              {...register(fieldname)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
