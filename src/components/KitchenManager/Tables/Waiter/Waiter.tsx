import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Button, // Add this
} from '@nextui-org/react';
import { SearchIcon } from '@/components/TopLevelManager/Tables/FoodItems/Components/SearchIcon';
import { useUsers } from '@/api/useUser';

const columns = [
  { name: 'NAME', uid: 'firstName', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'PHONE', uid: 'phoneNumber', sortable: true },
  { name: 'STATUS', uid: 'status', sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ['firstName', 'email', 'phoneNumber', 'status'];

export default function App() {
  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'firstName',
    direction: 'ascending',
  });

  const { getWaiterById } = useUsers();

  const { data: waiters = [], isLoading } = useQuery({
    queryKey: ['waiters'],
    queryFn: () => getWaiterById(),
  });

  const colours = [
    '#ff7171',
    '#b9b037',
    '#37b939',
    '#4e4ee3',
    '#e34ecd',
    '#e3914e',
  ];

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filtered = [...waiters];
    if (hasSearchFilter) {
      filtered = filtered.filter((waiter) =>
        waiter.firstName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filtered;
  }, [waiters, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((waiter, columnKey) => {
    const cellValue = waiter[columnKey];
    switch (columnKey) {
      case 'firstName':
        return (
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] flex justify-center overflow-hidden">
              <div
                className="rounded-full w-full h-full flex justify-center items-center text-white font-bold"
                style={{
                  backgroundColor: `${colours[Math.floor(Math.random() * 6)]}`,
                }}
              >
                {waiter.firstName.charAt(0)}
              </div>
            </div>
            <div className="ml-5">
              <p className="text-bold text-small capitalize dark:text-white text-foodbg">
                {waiter.firstName} {waiter.lastName}
              </p>
              <p className="text-bold text-[12px] capitalize">
                ID: {waiter.id}
              </p>
            </div>
          </div>
        );
      case 'status':
        return waiter.status === 'AVAILABLE' ? (
          <div className="dark:text-success dark:bg-[#00ff2213] border dark:border-[#43ff3952] text-[#067c00c5] bg-[#0d9e2113] border-[#10860a52] flex justify-center w-[80px] rounded-full">
            Available
          </div>
        ) : (
          <div className="text-danger bg-[#ff000018] border border-[#ff000044] flex justify-center w-[110px] rounded-full">
            Not Available
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] dark:bg-[#ffffff14] rounded-lg border bg-[#aaaaaa14] border-[#aaaaaa66] dark:border-[#54545466]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {waiters.length} waiters
          </span>
        </div>
      </div>
    );
  }, [filterValue, waiters.length]);

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
  }, [page, pages]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns instanceof Set && visibleColumns.size === columns.length)
      return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  return (
    <Table
      aria-label="Waiters table"
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
      <TableBody
        emptyContent={'No waiters found'}
        items={sortedItems}
        loadingContent={isLoading ? 'Loading...' : null}
        isLoading={isLoading}
      >
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
