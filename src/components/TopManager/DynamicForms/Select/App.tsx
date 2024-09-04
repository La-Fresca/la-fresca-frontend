import { Select, SelectItem, Avatar } from '@nextui-org/react';
import { users } from './data';

export default function App() {
  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="mb-2 flex rounded border border-stroke py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark bg-inherit">
            <Select
              items={users}
              className="w-full"
              variant="bordered"
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
                    'p-0 border-small border-divider bg-[#252828] bg-opacity-70 rounded-md text-white',
                },
                placement: 'bottom', // Ensures dropdown always opens downward
                shouldFlip: false, // Prevents dropdown from flipping when it reaches viewport bounds
              }}
              renderValue={(items) => {
                return items.map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <Avatar
                      alt={item.data.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.data.avatar}
                    />
                    <div className="flex flex-col">
                      <span>{item.data.name}</span>
                      <span className="text-default-500 text-tiny">
                        ({item.data.email})
                      </span>
                    </div>
                  </div>
                ));
              }}
            >
              {(user) => (
                <SelectItem key={user.id} textValue={user.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={user.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={user.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{user.name}</span>
                      <span className="text-tiny text-default-400">
                        {user.email}
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
