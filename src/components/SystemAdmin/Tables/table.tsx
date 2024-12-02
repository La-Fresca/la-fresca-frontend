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
  User as UserComponent, // Renamed to avoid conflict with the User type
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  AvatarProps,
} from '@nextui-org/react';
import { AiOutlinePlus as PlusIcon } from 'react-icons/ai';
import { BsThreeDotsVertical as VerticalDotsIcon } from 'react-icons/bs';
import { FiChevronDown as ChevronDownIcon } from 'react-icons/fi';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { Log } from '@/types/logs';
import { useQuery } from '@tanstack/react-query';
import { useLogs } from '@/api/useLog';

const columns = [
  { name: 'Date & Time', uid: 'dateTime', sortable: true },
  { name: 'Email', uid: 'email', sortable: true },
  { name: 'Description', uid: 'description', sortable: true },
];

// Add this function to parse log strings
const parseLogData = (logStrings: string[]) => {
  return logStrings.map((log, index) => {
    const [dateTime, email, ...descriptionParts] = log.split(' ');
    return {
      userId: index, // Using index as userId since it's required for the key prop
      dateTime: new Date(dateTime).toLocaleString(),
      email: email,
      description: descriptionParts.join(' '),
    };
  });
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['dateTime', 'email', 'description'];

export default function LogsTable() {
  const { getAllReadableLogs } = useLogs();

  // 1. Define all state hooks at the top
  const [filterValue, setFilterValue] = React.useState<string>('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(20);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState<number>(1);

  // 2. Query data
  const logsQuery = useQuery({
    queryKey: ['logs'],
    queryFn: getAllReadableLogs,
  });

  // 3. Memoize parsed logs
  const logs = React.useMemo(() => {
    if (!logsQuery.data) return [];
    return parseLogData(logsQuery.data);
  }, [logsQuery.data]);

  // 4. Define all other memoized values and callbacks
  const pages = Math.ceil(logs.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredLogs = [...logs];

    if (hasSearchFilter) {
      filteredLogs = filteredLogs.filter((log) =>
        log.description.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredLogs;
  }, [filterValue, logs]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Log, b: Log) => {
      const first = a[sortDescriptor.column as keyof Log] as unknown as number;
      const second = b[sortDescriptor.column as keyof Log] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((log: any, columnKey: React.Key) => {
    const cellValue = log[columnKey as keyof typeof log];

    switch (columnKey) {
      case 'dateTime':
        return <div className="text-sm">{cellValue}</div>;
      case 'email':
        return <div className="text-sm">{cellValue}</div>;
      case 'description':
        return <div className="text-sm whitespace-normal">{cellValue}</div>;
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
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
            placeholder="Search by description..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
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
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {`Total ${filteredItems.length} Logs`}
        </span>
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
  }, [filteredItems.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-[#373737]', 'text-white'], // Removed border-b and border-divider
      td: [
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        'group-data-[middle=true]:before:rounded-none',
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  );

  // 5. Show loading state after all hooks are defined
  if (logsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // 6. Return the table component
  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Logs table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
      classNames={classNames}
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
            allowsSorting={column.uid !== 'actions'}
            className="dark:bg-[#373737] translate-y-[-16px] bg-[#aaaaaa20] dark:text-white text-[#3a3a3a] h-[45px]"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'}>
        {sortedItems.map((user) => (
          <TableRow key={user.userId} className="border-b border-slate-700">
            {(columnKey) => (
              <TableCell>{renderCell(user, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
