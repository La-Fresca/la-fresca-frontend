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
  Selection,
  SortDescriptor,
} from '@nextui-org/react';
import { FiChevronDown as ChevronDownIcon } from 'react-icons/fi';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { useBackup } from '@/api/useBackup';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const columns = [
  { name: 'Backup Name', uid: 'name', sortable: true },
  { name: 'Size (KB)', uid: 'size', sortable: true },
  { name: 'Modified Date', uid: 'modified', sortable: true },
  { name: 'Actions', uid: 'actions' },
];

const scheduleOptions = [
  { name: 'Daily', uid: 'daily' },
  { name: 'Weekly', uid: 'weekly' },
  { name: 'Monthly', uid: 'monthly' },
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const INITIAL_VISIBLE_COLUMNS = ['name', 'size', 'modified', 'actions'];

export interface BackupInfo {
  name: string;
  size: number;
  modified: string;
}

export type BackupInterval = 'daily' | 'weekly' | 'monthly';

export default function BackupTable() {
  const { listBackups, restoreBackup, createBackup, scheduleBackup } =
    useBackup();

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'modified',
    direction: 'descending',
  });
  const [page, setPage] = React.useState(1);

  const backupsQuery = useQuery({
    queryKey: ['backups'],
    queryFn: listBackups,
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredBackups = [...(backupsQuery.data || [])];

    if (hasSearchFilter) {
      filteredBackups = filteredBackups.filter((backup) =>
        backup.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredBackups;
  }, [backupsQuery.data, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: BackupInfo, b: BackupInfo) => {
      const first = a[sortDescriptor.column as keyof BackupInfo];
      const second = b[sortDescriptor.column as keyof BackupInfo];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleCreateBackup = async () => {
    try {
      await Swal.fire({
        title: 'Create Backup',
        text: 'Are you sure you want to create a new backup?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#F5793B',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, create it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await createBackup();
          await backupsQuery.refetch();
          Swal.fire('Success!', 'Backup has been created.', 'success');
        }
      });
    } catch (error) {
      Swal.fire('Error!', 'Failed to create backup.', 'error');
    }
  };

  const handleScheduleBackup = async (interval: string) => {
    try {
      await Swal.fire({
        title: 'Schedule Backup',
        text: `Are you sure you want to schedule ${interval} backups?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#F5793B',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, schedule it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await scheduleBackup(interval as BackupInterval);
          Swal.fire(
            'Success!',
            `Backups scheduled for ${interval} interval.`,
            'success',
          );
        }
      });
    } catch (error) {
      Swal.fire('Error!', 'Failed to schedule backup.', 'error');
    }
  };

  const handleRestore = async (backupName: string) => {
    try {
      await Swal.fire({
        title: 'Restore Backup',
        text: 'Are you sure you want to restore this backup? This will overwrite current data.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, restore it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await restoreBackup(backupName);
          Swal.fire('Success!', 'Backup has been restored.', 'success');
        }
      });
    } catch (error) {
      Swal.fire('Error!', 'Failed to restore backup.', 'error');
    }
  };

  const renderCell = React.useCallback(
    (backup: BackupInfo, columnKey: React.Key) => {
      switch (columnKey) {
        case 'name':
          return <div className="text-sm">{backup.name}</div>;
        case 'size':
          return (
            <div className="text-sm">{(backup.size / 1024).toFixed(2)} KB</div>
          );
        case 'modified':
          return (
            <div className="text-sm">
              {format(new Date(backup.modified), 'PPpp')}
            </div>
          );
        case 'actions':
          return (
            <div className="flex justify-center">
              <Button
                size="sm"
                variant="flat"
                className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040]"
                onClick={() => handleRestore(backup.name)}
              >
                Restore
              </Button>
            </div>
          );
        default:
          return backup[columnKey as keyof BackupInfo];
      }
    },
    [],
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

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
        <span className="w-[30%] text-small text-default-400">
          {`Total ${filteredItems.length} Backups`}
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
  }, [filteredItems.length, page, pages, onPreviousPage, onNextPage]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-2xl text-white font-bold">Database Backups</h1>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] dark:bg-[#ffffff14] rounded-lg border bg-[#aaaaaa14] border-[#aaaaaa66] dark:border-[#54545466]"
            placeholder="Search by backup name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={setFilterValue}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040]"
                >
                  Schedule Backup
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Schedule options"
                className="dark:bg-[#373737] bg-whiten rounded-lg dark:text-white text-[#3a3a3a] border border-[#b3b3b360]"
              >
                {scheduleOptions.map((option) => (
                  <DropdownItem
                    key={option.uid}
                    className="capitalize hover:bg-[#aaaaaa17] rounded-lg"
                    onClick={() => handleScheduleBackup(option.uid)}
                  >
                    {option.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 rounded-xl"
              onClick={handleCreateBackup}
            >
              Create Backup
            </Button>
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
      </div>
    );
  }, [filterValue, visibleColumns]);

  if (backupsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Backups table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: ['max-h-[382px]', 'max-w-3xl'],
        th: ['bg-[#373737]', 'text-white'],
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
      <TableBody emptyContent={'No backups found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.name} className="border-b border-slate-700">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
