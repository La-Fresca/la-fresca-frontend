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
  Pagination,
  ChipProps,
} from '@nextui-org/react';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import { SearchIcon } from './SearchIcon';
import { useNavigate } from 'react-router-dom';
import { Food } from '@/types/food';
import { useFoods } from '@/api/useFoods';
import { swalConfirm } from '@/components/UI/SwalConfirm';

const INITIAL_VISIBLE_COLUMNS = [
  'foodId',
  'name',
  'price',
  'availability',
  'cafeId',
  'categories',
  'discountStatus',
  'discountId',
  'features',
  'actions',
];

const columns = [
  { name: 'Name', uid: 'name' },
  { name: 'Price', uid: 'price' },
  { name: 'Availability', uid: 'availability' },
  { name: 'Cafe ID', uid: 'cafeId' },
  { name: 'Categories', uid: 'categories' },
  { name: 'Discount Status', uid: 'discountStatus' },
  { name: 'Discount ID', uid: 'discountId' },
  { name: 'Features', uid: 'features' },
  { name: 'Actions', uid: 'actions' },
];

export default function FoodList() {
  const { showSwal } = swalConfirm();
  const [inputValue, setInputValue] = React.useState('');
  const { getAllFoods } = useFoods();
  const [loading, setLoading] = React.useState(true);
  const { deleteFood } = useFoods();
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

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getAllFoods();
      setFoods(data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleDeleteFood = async (id: string) => {
    try {
      await deleteFood(id);
      fetchItems();
    } catch (error: any) {
      console.error('Failed to delete food:', error);
    }
  };

  const handleConfirmDelete = (id: string) => {
    showSwal(() => handleDeleteFood(id));
  };

  React.useEffect(() => {
    fetchItems();
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
        return `Rs.${cellValue}`;
      case 'availability':
        return cellValue === 1 ? 'Available' : 'Not Available';
      case 'discountStatus':
        return cellValue === 1 ? 'Discounted' : 'Not Discounted';
      case 'discountId':
        return cellValue ? cellValue : 'N/A';
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
                <DropdownItem onClick={() => handleConfirmDelete(food.id)}>
                  Delete
                </DropdownItem>
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

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
      classNames={classNames}
      topContent={topContent}
      topContentPlacement="outside"
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
