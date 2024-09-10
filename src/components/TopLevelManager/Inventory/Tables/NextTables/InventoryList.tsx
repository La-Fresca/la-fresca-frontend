import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
} from '@nextui-org/react';
import { PlusIcon } from '@/components/Storekeeper/Tables/NextTables/stockCollection/PlusIcon';
import { VerticalDotsIcon } from '@/components/Storekeeper/Tables/NextTables/stockCollection/VerticalDotsIcon';
import { SearchIcon } from '@/components/Storekeeper/Tables/NextTables/stockCollection/SearchIcon';
import { ChevronDownIcon } from '@/components/Storekeeper/Tables/NextTables/stockCollection/ChevronDownIcon';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import {
  columns,
  statusOptions,
} from '@/components/Storekeeper/Tables/NextTables/stockCollection/data';
import { capitalize } from './utils';


import { Link, useNavigate } from 'react-router-dom';
import { Inventory } from '@/types/inventory';
import { useInventory } from '@/api/useInventory';
import { swalConfirm } from '@/components/UI/SwalConfirm';

const statusColorMap = {
  'High stock': 'success',
  'Out of stock': 'danger',
  'Low stock': 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['Name', 'AvailableAmount', 'PredictedStockoutDate', 'Status', 'actions'];

export default function App() {

  const { showSwal } = swalConfirm();
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const { getAllInventory, deleteInventory } = useInventory();
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const data = await getAllInventory();
      setInventory(data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleDeleteInventory = async (id: string) => {
    try {
      await deleteInventory(id);
      fetchInventory();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleConfirmDelete = (id: any) => {
    showSwal(() => handleDeleteInventory(id));
  };

  useEffect(() => {
    fetchInventory();
  }, []);



  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('add');
  };

  const viewItem = (collectionName: String | null) => {
    if (collectionName) {
      navigate(`../viewCollections/${collectionName}`);
    }
  };

  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns instanceof Set && visibleColumns.size === columns.length)
      return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredinventory = [...inventory];
    if (hasSearchFilter) {
      filteredinventory = filteredinventory.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredinventory = filteredinventory.filter((user) =>
        Array.from(statusFilter).includes(user.Status),
      );
    }
    return filteredinventory;
  }, [inventory, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'Name':
        return (
          <div className="flex items-center">
            <div className="w-[40px] h-[40px]">
              <img src={user.avatar} alt="" className="rounded-full" />
            </div>
            <div className="ml-5">
              <p className="text-bold text-small capitalize dark:text-white text-foodbg">
                {cellValue}
              </p>
              <p className="text-bold text-[12px] capitalize">ID: {user.id}</p>
            </div>
          </div>
        );
      case 'AvailableAmount':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue} {user.Unit}
            </p>
          </div>
        );
      case 'Status':
        return (
          <Chip
            // className="capitalize"
            color={statusColorMap[user.Status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-center items-center gap-2 hover:cursor-pointer bg-foodbg rounded-lg py-2 hover:bg-transparent border border-foodbg" onClick={() => viewItem(user.Name)}>
          {/* <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="bg-black text-white">
              <DropdownItem onClick={() => navigate(`view/123`)}>
                View
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          View
        </div>
        );
      default:
        return cellValue;
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

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] dark:bg-[#ffffff14] rounded-lg border bg-[#aaaaaa14] border-[#aaaaaa66] dark:border-[#54545466]"
            placeholder="Search by item name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040]">
              <ArrowSmallDownIcon className="w-6 h-6 border-b scale-75" />{' '}
              Download All
            </Button>

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040]"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
                className="dark:bg-[#373737] bg-whiten rounded-lg dark:text-white text-[#3a3a3a] border border-[#b3b3b360]"
              >
                {statusOptions.map((status) => (
                  <DropdownItem
                    key={status.uid}
                    className="capitalize hover:bg-[#aaaaaa17] rounded-lg"
                  >
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040]"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
                className="dark:bg-[#373737] bg-whiten rounded-lg dark:text-white text-[#3a3a3a] border border-[#b3b3b360]"
              >
                {columns.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    className="capitalize hover:bg-[#aaaaaa17] rounded-lg"
                  >
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {inventory.length} collections
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
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    inventory.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
          radius="full"
          className="text-[#c6c6c6]"
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
            className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040] py-[18px]"
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040] py-[18px]"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[382px]',
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
            className="dark:bg-[#373737] translate-y-[-16px] bg-[#aaaaaa20] dark:text-white text-[#3a3a3a] h-[45px]"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No inventory found'} items={sortedItems}>
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
