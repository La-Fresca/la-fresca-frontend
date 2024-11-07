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
  Pagination,
} from '@nextui-org/react';
import { SearchIcon } from '@/components/TopLevelManager/Tables/FoodItems/Components/SearchIcon';
import { ChevronDownIcon } from '@/components/TopLevelManager/Tables/FoodItems/Components/ChevronDownIcon';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import {
  columns,
  statusOptions,
} from '@/components/TopLevelManager/Tables/FoodItems/Components/data';
import { capitalize } from './utils';
import { Food } from '@/types/food';
import { useFoods } from '@/api/useFoods';
import checkIcon from '@images/icon/check.png';
import crossIcon from '@images/icon/cross2.png';
import { swalConfirm } from '@/components/UI/SwalConfirm';

const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'available',
  'price',
  'status',
  'actions',
];

export default function App() {
  const { showSwalApprove, showSwalReject } = swalConfirm();
  const [food, setFood] = useState<Food[]>([]);
  const { getAllFoodsForTLM, approveFood, rejectFood } = useFoods();
  const [loading, setLoading] = React.useState(true);

  const fetchFood = async () => {
    try {
      const data = await getAllFoodsForTLM();
      setFood(data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  // Approve food item
  const handleApproveFood = async (id: string) => {
    try {
      await approveFood(id);
      fetchFood();
    } catch (error: any) {
      console.error('Failed to approve food:', error);
    }
  };

  const handleConfirmApprove = (id: string) => {
    showSwalApprove(() => handleApproveFood(id));
  };

  // Reject food item
  const handleRejectFood = async (id: string) => {
    try {
      await rejectFood(id);
      fetchFood();
    } catch (error: any) {
      console.error('Failed to reject food:', error);
    }
  };

  const handleConfirmReject = (id: string) => {
    showSwalReject(() => handleRejectFood(id));
  };

  console.log(food);

  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
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
    let filteredfood = [...food];
    if (hasSearchFilter) {
      filteredfood = filteredfood.filter((foodData) =>
        foodData.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredfood = filteredfood.filter((foodData) =>
        Array.from(statusFilter).includes(foodData.status),
      );
    }
    return filteredfood;
  }, [food, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((foodData, columnKey) => {
    const cellValue = foodData[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] flex justify-center overflow-hidden rounded-full">
              <img src={foodData.image} alt="" />
            </div>
            <div className="ml-5">
              <p className="text-bold text-small capitalize dark:text-white text-foodbg">
                {cellValue}
              </p>
              <p className="text-bold text-[12px] capitalize">
                ID: {foodData.id}
              </p>
            </div>
          </div>
        );
      case 'available':
        if (cellValue === 0) {
          return (
            <div className="text-[#ff0000] bg-[#ff000018] border border-[#ff000044] flex justify-center rounded-full">
              Not Available
            </div>
          );
        } else if (cellValue === 1) {
          return (
            <div className="dark:text-[#43ff39c5] dark:bg-[#00ff2213] border dark:border-[#43ff3952] text-[#067c00c5] bg-[#0d9e2113] border-[#10860a52] flex justify-center rounded-full">
              Available
            </div>
          );
        }
        return null;
      case 'discountStatus':
        if (cellValue === 0) {
          return (
            <div className="text-[orange] bg-[#ffa60020] border border-[#ffa6003b] flex justify-center rounded-full">
              N/A
            </div>
          );
        } else if (cellValue === 1) {
          return (
            <div className="dark:text-[#43ff39c5] dark:bg-[#00ff2213] border dark:border-[#43ff3952] text-[#067c00c5] bg-[#0d9e2113] border-[#10860a52] flex justify-center rounded-full">
              Applicable
            </div>
          );
        }
        return null;
      case 'status':
        if (cellValue === 2) {
          return (
            <div className="text-[orange] bg-[#ffa60020] border border-[#ffa6003b] flex justify-center rounded-full">
              Pending
            </div>
          );
        } else if (cellValue === 0) {
          return (
            <div className="dark:text-[#43ff39c5] dark:bg-[#00ff2213] border dark:border-[#43ff3952] text-[#067c00c5] bg-[#0d9e2113] border-[#10860a52] flex justify-center rounded-full">
              Approved
            </div>
          );
        } else if (cellValue === 3) {
          return (
            <div className="text-[#ff2020] bg-[#ff000018] border border-[#ff000044] flex justify-center rounded-full">
              Rejected
            </div>
          );
        }
      case 'features':
        return (
          <div>
            {foodData.features.map((feature: any) => (
              <div key={feature.name}>
                <strong>{feature.name}</strong>: {feature.levels.join(', ')}
              </div>
            ))}
          </div>
        );
      case 'actions':
        if (foodData.status === 2) {
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Button className="rounded-full dark:text-[#43ff39c5] dark:bg-[#00ff2213] border-2 dark:border-[#43ff3952] text-[#067c00c5] bg-[#0d9e2113] border-[#10860a52] scale-90 min-w-[20px]" onClick={() => handleConfirmApprove(foodData.id)}>
                <img src={checkIcon} className="w-[20px]" alt="" />
              </Button>
              <Button className="rounded-full text-[#ff1414] bg-[#ff000027] border-2 border-[#ff000078] scale-90 min-w-[5px]" onClick={() => handleConfirmReject(foodData.id)}>
                <img src={crossIcon} className="w-[20px]" alt="" />
              </Button>
            </div>
          );
        } else if (foodData.status === 0) {
          return (
            <Button className="rounded-full text-[#ff1414] bg-[#ff000027] border-2 border-[#ff000078] scale-90 min-w-[5px]" onClick={() => handleConfirmReject(foodData.id)}>
              <img src={crossIcon} className="w-[20px]" alt="" />
            </Button>
          );
        }
        return null;
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
            placeholder="Search by food name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
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
            <Button className="rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600">
              <ArrowSmallDownIcon className="w-6 h-6 border-b scale-75" />{' '}
              Download All
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {food.length} foods
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:&nbsp;
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
    food.length,
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
            align={
              column.uid === 'actions' ||
              column.uid === 'discountStatus' ||
              column.uid === 'available' ||
              column.uid === 'price' ||
              column.uid === 'status'
                ? 'center'
                : 'start'
            }
            allowsSorting={column.sortable}
            className="dark:bg-[#373737] translate-y-[-16px] bg-[#aaaaaa20] dark:text-white text-[#3a3a3a] h-[45px]"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No food found'} items={sortedItems}>
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
