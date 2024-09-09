import React from "react";
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
} from "@nextui-org/react";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { BsThreeDotsVertical as VerticalDotsIcon } from "react-icons/bs";
import { FiChevronDown as ChevronDownIcon } from "react-icons/fi";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";

// import { columns, users, statusOptions } from "./data";
// import { capitalize } from "utils";

const columns = [
  { name: "Time", uid: "time", sortable: true },
  { name: "User ID", uid: "userId", sortable: true },
  { name: "User", uid: "user", sortable: true },
  { name: "Role", uid: "role", sortable: true },
  { name: "Branch", uid: "branch" },
  { name: "Description", uid: "description" },
];

// const statusOptions = [
//   {name: "Active", uid: "active"},
//   {name: "Paused", uid: "paused"},
//   {name: "Vacation", uid: "vacation"},
// ];

const logs = [
  {
    time: "2024-09-01 08:30",
    userId: 1,
    user: "Tony Reichert",
    role: "CEO",
    branch: "Head Office",
    description: "Created Maharagama Branch",
    email: "tony.reichert@example.com",
  },
  {
    time: "2024-09-02 09:15",
    userId: 2,
    user: "Sarah Parker",
    role: "Manager",
    branch: "Maharagama",
    description: "Updated menu items",
    email: "sarah.parker@example.com",
  },
  {
    time: "2024-09-02 10:00",
    userId: 3,
    user: "Michael Smith",
    role: "Barista",
    branch: "Colombo 7",
    description: "Prepared coffee orders",
    email: "michael.smith@example.com",
  },
  {
    time: "2024-09-02 11:30",
    userId: 4,
    user: "Laura Johnson",
    role: "Waitress",
    branch: "Kandy",
    description: "Served breakfast orders",
    email: "laura.johnson@example.com",
  },
  {
    time: "2024-09-03 08:45",
    userId: 5,
    user: "David Wilson",
    role: "Chef",
    branch: "Galle",
    description: "Prepared lunch specials",
    email: "david.wilson@example.com",
  },
  {
    time: "2024-09-03 14:20",
    userId: 6,
    user: "Emily Davis",
    role: "Manager",
    branch: "Matara",
    description: "Reviewed employee schedules",
    email: "emily.davis@example.com",
  },
  {
    time: "2024-09-04 07:00",
    userId: 7,
    user: "Chris Lee",
    role: "Cleaner",
    branch: "Nugegoda",
    description: "Cleaned the cafe premises",
    email: "chris.lee@example.com",
  },
  {
    time: "2024-09-04 12:10",
    userId: 8,
    user: "Emma Brown",
    role: "Cashier",
    branch: "Kurunegala",
    description: "Processed payment for orders",
    email: "emma.brown@example.com",
  },
  {
    time: "2024-09-05 09:30",
    userId: 9,
    user: "Liam Johnson",
    role: "Barista",
    branch: "Kandy",
    description: "Made espresso drinks",
    email: "liam.johnson@example.com",
  },
  {
    time: "2024-09-05 13:45",
    userId: 10,
    user: "Sophia Martinez",
    role: "Manager",
    branch: "Colombo 7",
    description: "Handled customer complaints",
    email: "sophia.martinez@example.com",
  },
];


function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["time","userId","name", "role", "branch", "description","user"];

type Log = {
  time: string;
  userId: string;
  user: string;
  role: string;
  branch: string;
  description: string;
  email: string;
};

export default function LogsTable() {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState<number>(1);

  const pages = Math.ceil(logs.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...logs];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.user.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    

    return filteredUsers;
  }, [filterValue, statusFilter]);

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

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: Log, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Log];

    switch (columnKey) {
      case "name":
        return (
          <UserComponent
            // avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue as string}
          >
            {user.email}
          </UserComponent>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue as string}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-500">{user.role}</p> */}
          </div>
        );
      // case "status":
      //   return (
      //     <Chip
      //       className="capitalize border-none gap-1 text-default-600"
      //       color={statusColorMap[user.status]}
      //       size="sm"
      //       variant="dot"
      //     >
      //       {cellValue as string}
      //     </Chip>
      //   );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-white font-bold">System Logs</h1>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
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
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
                className="bg-black text-white"
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
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {logs.length} users</span>
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
    onSearchChange,
    onRowsPerPageChange,
    logs.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          size="sm"
          total={pages}
          onChange={setPage}
        />
        <span className="text-default-400">
          {page}-{pages} of {logs.length}
        </span>
      </div>
    );
  }, [page, pages, logs.length, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={bottomContent}
      className="border-default-200"
      fullWidth
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.uid !== "actions"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"}>
        {sortedItems.map((user) => (
          <TableRow 
            key={user.userId}
            className="border-b border-slate-700" 
          >
            {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}  