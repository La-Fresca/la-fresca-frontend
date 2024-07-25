import { useState, useEffect, useMemo, useCallback } from 'react';
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
  Selection,
  SortDescriptor,
} from '@nextui-org/react';
import { PlusIcon } from '@components/BranchManager/Tables/NextTable/PlusIcon';
import { VerticalDotsIcon } from '@components/BranchManager/Tables/NextTable/VerticalDotsIcon';
import { ChevronDownIcon } from '@components/BranchManager/Tables/NextTable/ChevronDownIcon';
import { SearchIcon } from '@components/BranchManager/Tables/NextTable/SearchIcon';
import { columns } from './columnStocks';
import { capitalize } from './utils';
import { useNavigate } from 'react-router-dom';
import { Stock } from '@/types/stock';
import { useStocks } from '@/api/useStocks';
import { swalConfirm } from '@/components/UI/SwalConfirm';

const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'name',
  'quantity',
  'limit',
  'expire',
  'actions',
];

export default function StockList() {
  const { showSwal } = swalConfirm();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const { getAllStocks, unsafeDeleteStock } = useStocks();

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleDeleteStock = async (id: string) => {
    try {
      await unsafeDeleteStock(id);
      fetchStocks();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleConfirmDelete = (id: any) => {
    showSwal(() => handleDeleteStock(id));
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'descending',
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredStocks = [...stocks];

    if (hasSearchFilter) {
      filteredStocks = filteredStocks.filter((stock) =>
        stock.batchId.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredStocks;
  }, [stocks, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Stock, b: Stock) => {
      const first = a[sortDescriptor.column as keyof Stock] as number;
      const second = b[sortDescriptor.column as keyof Stock] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((stock: Stock, columnKey: React.Key) => {
    const cellValue = stock[columnKey as keyof Stock];

    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{stock.batchId}</p>
          </div>
        );
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case 'quantity':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{stock.availableAmount}</p>
          </div>
        );
      case 'limit':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{stock.lowerLimit}</p>
          </div>
        );
      case 'expire':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{stock.expiryDate}</p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="bg-black text-white">
                <DropdownItem>View</DropdownItem>
                <DropdownItem onClick={() => navigate(`edit/${stock.id}`)}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => handleConfirmDelete(stock.id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1',
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="bg-black text-white"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg"
              color="primary"
              endContent={<PlusIcon />}
              onClick={() => navigate('add')}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {stocks.length} grns
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
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    stocks.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
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
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No grns found'} items={sortedItems}>
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
