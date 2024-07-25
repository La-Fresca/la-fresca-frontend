import React, { FC, useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Category } from '@/types/mock_category';

interface AppProps {
  categories: Category[];
  fieldname: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

const App: FC<AppProps> = ({ categories, register, fieldname, setValue }) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  useEffect(() => {
    setValue(
      fieldname,
      selectedOptions.map((option) => option.value),
    );
  }, [selectedOptions, setValue, fieldname]);

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  const customStyles = {
    multiValue: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="mb-2 flex rounded border border-stroke py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark bg-inherit">
            <Select
              isMulti
              options={categories.map((category) => ({
                value: category.key,
                label: category.label,
              }))}
              placeholder="Select an option"
              className="w-full pl-4 pr-4"
              classNamePrefix="react-select"
              unstyled
              styles={customStyles}
              onChange={handleChange}
              components={{ MultiValueContainer: () => null }}
            />
            <input
              type="hidden"
              value={selectedOptions.map((option) => option.value)}
              {...register(fieldname)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {selectedOptions.map((option) => (
              <div
                key={option.value}
                className="bg-opacity-25 flex items-center px-3 py-1 rounded-full bg-yellow-500"
              >
                {option.label}
                <button
                  className="ml-2 text-red-500 justify-end"
                  onClick={() => {
                    const updatedOptions = selectedOptions.filter(
                      (selected) => selected.value !== option.value,
                    );
                    setSelectedOptions(updatedOptions);
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
