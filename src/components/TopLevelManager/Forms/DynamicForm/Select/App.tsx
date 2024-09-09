import { Select, SelectItem, Chip, SelectedItems } from '@nextui-org/react';
import { branches } from './data';

type Branch = {
  id: number;
  name: string;
  contact: string;
  status: string;
  manager: string;
};

export default function App() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="mb-2 flex rounded border border-stroke py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark bg-inherit">
            <Select
              items={branches}
              className="w-full"
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              labelPlacement="outside"
              classNames={{
                trigger: 'min-h-12 py-2',
                base: 'max-w-full',
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    'rounded-md',
                    'text-default-500',
                    'transition-opacity',
                    'data-[hover=true]:text-foreground',
                    'data-[hover=true]:bg-default-100',
                    'dark:data-[hover=true]:bg-default-50',
                    'data-[selectable=true]:focus:bg-default-50',
                    'data-[pressed=true]:opacity-70',
                    'data-[focus-visible=true]:ring-default-500',
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: 'max-w-full mt-4',
                  content:
                    'p-0 border-small border-divider bg-[#252828] rounded-md text-white',
                },
                placement: 'bottom', // Ensures dropdown always opens downward
                //shouldFlip: false, // Prevents dropdown from flipping when it reaches viewport bounds
              }}
              renderValue={(items: SelectedItems<Branch>) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Chip
                        className="bg-orange-300 bg-opacity-50"
                        key={item.key}
                      >
                        {item.data.name}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(branch) => (
                <SelectItem key={branch.id} textValue={branch.name}>
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-200 text-black font-bold">
                      {branch.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-small">{branch.name}</span>
                      <span className="text-tiny text-default-400">
                        {branch.manager}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
