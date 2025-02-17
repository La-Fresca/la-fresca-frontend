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
import { PlusIcon } from '@/components/BranchManager/Tables/UserManagement/Components/PlusIcon';
import { VerticalDotsIcon } from '@/components/BranchManager/Tables/UserManagement/Components/VerticalDotsIcon';
import { SearchIcon } from '@/components/BranchManager/Tables/UserManagement/Components/SearchIcon';
import { ChevronDownIcon } from '@/components/BranchManager/Tables/UserManagement/Components/ChevronDownIcon';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import {
  columns,
  statusOptions,
} from '@/components/BranchManager/Tables/UserManagement/Components/data';
import { capitalize } from './utils';

import { Link, useNavigate } from 'react-router-dom';
import { swalConfirm } from '@/components/UI/SwalConfirm';

import { User } from '@/types/user';
import { useUsers } from '@/api/useUser';

const statusColorMap = {
  OPEN: 'success',
  CLOSED: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  'firstName',
  'email',
  'phoneNumber',
  'role',
  'actions',
];

export default function App() {
  const { showSwal } = swalConfirm();
  const [users, setUsers] = useState<User[]>([]);
  const { getAllUsers } = useUsers();
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  // const handleDeleteUser = async (id: string) => {
  //   try {
  //     await deleteUser(id);
  //     fetchUser();
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };

  // const handleConfirmDelete = (id: any) => {
  //   showSwal(() => handleDeleteUser(id));
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('add');
  };

  const viewUser = (UserId: string | null) => {
    if (UserId) {
      navigate(`/top-level-manager/manage-bms/view/${UserId}`);
    }
  };

  const updateUser = (id: String | null) => {
    console.log(id);
    if (id) {
      navigate(`edit/${id}`);
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
    let filteredUser = [...users];
    if (hasSearchFilter) {
      filteredUser = filteredUser.filter((userData) =>
        userData.firstName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    
    return filteredUser;
  }, [users, filterValue]);

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

  const colours = ["#ff7171", "#b9b037", "#37b939", "#4e4ee3", "#e34ecd", "#e3914e"];

  const renderCell = React.useCallback((userData, columnKey) => {
    const cellValue = userData[columnKey];
    switch (columnKey) {
      case 'firstName':
        return (
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] flex justify-center overflow-hidden">
              <div className="rounded-full w-full h-full flex justify-center items-center text-white font-bold" style={{backgroundColor: `${colours[Math.floor(Math.random() * 6)]}`}}>{cellValue.split(" ").map(word => word.charAt(0)).join("")}</div>
            </div>
            <div className="ml-5">
              <p className="text-bold text-small capitalize dark:text-white text-foodbg">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-bold text-[12px] capitalize">
                ID: {userData.id}
              </p>
            </div>
          </div>
        );
      case 'status':
        if (cellValue === "CLOSED") {
          return (
            <div className="text-danger bg-[#ff000018] border border-[#ff000044] flex justify-center rounded-full w-[80px]">
              Closed
            </div>
          );
        } else if (cellValue === "OPEN") {
          return (
            <div className="dark:text-success dark:bg-[#00ff2213] border dark:border-[#43ff3952] text-[#067c00c5] bg-[#0d9e2113] border-[#10860a52] flex justify-center w-[70px] rounded-full">
              Open
            </div>
          );
        }
        return null;
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="dark:bg-[#373737] bg-whiten rounded-lg dark:text-white text-[#3a3a3a] border border-[#b3b3b360]">
                {/* <DropdownItem
                  className="hover:bg-[#aaaaaa17] rounded-lg"
                  onClick={() => viewUser(userData.id)}
                >
                  View
                </DropdownItem> */}
                <DropdownItem
                  className="hover:bg-[#aaaaaa17] rounded-lg"
                  onClick={() => updateUser(userData.id)}
                >
                  Edit
                </DropdownItem>
                {/* <DropdownItem className="hover:bg-[#aaaaaa17] rounded-lg" onClick={() => handleConfirmDelete(userData.id)}>
                  Delete
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
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
            placeholder="Search by first name..."
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

            {/* <Dropdown>
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
            </Dropdown> */}
            
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
            <Button
              endContent={<PlusIcon />}
              className="rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600"
              onClick={() => handleAddUser()}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
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
    // statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
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
      bottomContent = {bottomContent}
      bottomContentPlacement = "outside"
      classNames = {{
        wrapper: 'max-h-[382px]',
      }}
      sortDescriptor = {sortDescriptor}
      topContent = {topContent}
      topContentPlacement = "outside"
      onSortChange = {setSortDescriptor}
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
      <TableBody emptyContent={'No user found'} items={sortedItems}>
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
