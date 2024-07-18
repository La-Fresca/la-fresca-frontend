import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from '@nextui-org/react';
import { PlusIcon } from './PlusIcon';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { SearchIcon } from './SearchIcon';
import { capitalize } from './utils';
import { Navigate, useNavigate } from 'react-router-dom';

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = [
  'foodId',
  'name',
  'price',
  'availability',
  'cafeId',
  'category',
  'discountStatus',
  'discountId',
  'features',
  'actions',
];

type Food = {
  id: number;
  foodId: string;
  name: string;
  price: number;
  availability: number;
  cafeId: string;
  category: string;
  discountStatus: string;
  discountId: string;
  features: { name: string; levels: string[]; additionalPrices: number[] }[];
};

const fetchItems = async () => {
  try {
    const apiUrl = (import.meta as any).env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/food`);
    if (!response.ok) {
      throw new Error('Failed to fetch item');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching item:', error);
  }
};

const columns = [
  { name: 'Name', uid: 'name' },
  { name: 'Price', uid: 'price' },
  { name: 'Availability', uid: 'availability' },
  { name: 'Cafe ID', uid: 'cafeId' },
  { name: 'Category', uid: 'category' },
  { name: 'Discount Status', uid: 'discountStatus' },
  { name: 'Discount ID', uid: 'discountId' },
  { name: 'Features', uid: 'features' },
  { name: 'Actions', uid: 'actions' },
];

export default function FoodList() {
  const navigate = useNavigate();
  const [foods, setFoods] = React.useState<Food[]>([]);
  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'price',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      if (data) {
        setFoods(data);
      }
    };
    fetchData();
  }, []);

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredFoods = [...foods];

    if (hasSearchFilter) {
      filteredFoods = filteredFoods.filter((food) =>
        food.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredFoods;
  }, [foods, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as number;
      const second = b[sortDescriptor.column as keyof typeof b] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((food: any, columnKey: any) => {
    const cellValue = food[columnKey as keyof Food];

    switch (columnKey) {
      case 'name':
        return cellValue;
      case 'price':
        return `$${cellValue}`;
      case 'availability':
        return cellValue === 1 ? 'Available' : 'Not Available';
      case 'features':
        return (
          <div>
            {food.features.map((feature: any) => (
              <div key={feature.name}>
                <strong>{feature.name}</strong>: {feature.levels.join(', ')}
              </div>
            ))}
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="bg-black text-white">
                <DropdownItem
                  onClick={() => navigate(`/foodItems/viewfood/${food.id}`)}
                >
                  View
                </DropdownItem>
                <DropdownItem onClick={() => navigate(`edit/${food.id}`)}>
                  Edit
                </DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return String(cellValue);
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-white font-bold">Food List</h1>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Button
            className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 mt-8 px-10"
            onClick={() => navigate('add')}
          >
            Add New Item
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {foods.length} foods
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onRowsPerPageChange, foods.length]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <div className="hidden sm:flex w-[50%] justify-center gap-5">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Pagination
            isCompact
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      topContent={topContent}
      // sortDescriptor={sortDescriptor}
      // onSortChange={setSortDescriptor}
      className="w-full"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
