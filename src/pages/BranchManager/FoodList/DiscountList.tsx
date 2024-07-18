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
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
// Import discountData instead of users
// import { discountData } from "./data"; // assuming you have the data in data.js
import { capitalize } from "./utils";

// Define columns for Discount data
const columns = [
  { name: "Discount Name", uid: "Name" },
  { name: "Description", uid: "Description" },
  { name: "Discount Type", uid: "DiscountType" },
  { name: "Start Date", uid: "StartDate" },
  { name: "End Date", uid: "EndDate" },
  { name: "Menu Item Type", uid: "MenuItemType" },
  { name: "Discount Amount", uid: "DiscountAmount" },
  { name: "Offer Details", uid: "OfferDetails" },
  { name: "Actions", uid: "actions" },
];

const discountData = [
    {
      DiscountId: 1,
      Name: "Morning Saver",
      Description: "Get 20% off on all breakfast items.",
      DiscountType: "Percentage",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 101,
      IsActive: true,
      MenuItemType: "Breakfast",
      MenuItemId: 1,
      DiscountAmount: 20,
      OfferDetails: "Valid from 7 AM to 10 AM."
    },
    {
      DiscountId: 2,
      Name: "Lunch Combo",
      Description: "Flat $5 off on lunch combo.",
      DiscountType: "Flat",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 102,
      IsActive: true,
      MenuItemType: "Lunch",
      MenuItemId: 2,
      DiscountAmount: 5,
      OfferDetails: "Valid from 12 PM to 3 PM."
    },
    {
      DiscountId: 3,
      Name: "Happy Hour",
      Description: "Get 30% off on all drinks.",
      DiscountType: "Percentage",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 103,
      IsActive: true,
      MenuItemType: "Drinks",
      MenuItemId: 3,
      DiscountAmount: 30,
      OfferDetails: "Valid from 4 PM to 6 PM."
    },
    {
      DiscountId: 4,
      Name: "Dinner Delight",
      Description: "Flat $10 off on dinner orders above $50.",
      DiscountType: "Flat",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 104,
      IsActive: true,
      MenuItemType: "Dinner",
      MenuItemId: 4,
      DiscountAmount: 10,
      OfferDetails: "Valid for orders above $50."
    },
    {
      DiscountId: 5,
      Name: "Weekend Special",
      Description: "Get 25% off on all items during weekends.",
      DiscountType: "Percentage",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 105,
      IsActive: true,
      MenuItemType: "All",
      MenuItemId: 5,
      DiscountAmount: 25,
      OfferDetails: "Valid on Saturdays and Sundays."
    },
    {
      DiscountId: 6,
      Name: "Student Discount",
      Description: "Get 15% off on showing student ID.",
      DiscountType: "Percentage",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 106,
      IsActive: true,
      MenuItemType: "All",
      MenuItemId: 6,
      DiscountAmount: 15,
      OfferDetails: "Valid for students with ID."
    },
    {
      DiscountId: 7,
      Name: "Happy Monday",
      Description: "Get 10% off on all items on Mondays.",
      DiscountType: "Percentage",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 107,
      IsActive: true,
      MenuItemType: "All",
      MenuItemId: 7,
      DiscountAmount: 10,
      OfferDetails: "Valid all day on Mondays."
    },
    {
      DiscountId: 8,
      Name: "Coffee Lovers",
      Description: "Buy one get one free on all coffees.",
      DiscountType: "BOGO",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 108,
      IsActive: true,
      MenuItemType: "Drinks",
      MenuItemId: 8,
      DiscountAmount: 50,
      OfferDetails: "Valid all day."
    },
    {
      DiscountId: 9,
      Name: "Family Feast",
      Description: "Get 20% off on family meals.",
      DiscountType: "Percentage",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 109,
      IsActive: true,
      MenuItemType: "Dinner",
      MenuItemId: 9,
      DiscountAmount: 20,
      OfferDetails: "Valid for family meals only."
    },
    {
      DiscountId: 10,
      Name: "Birthday Bash",
      Description: "Get a free dessert on your birthday.",
      DiscountType: "Free Item",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 110,
      IsActive: true,
      MenuItemType: "Dessert",
      MenuItemId: 10,
      DiscountAmount: 100,
      OfferDetails: "Valid on your birthday only."
    },
    {
      DiscountId: 11,
      Name: "Late Night Snack",
      Description: "Flat $5 off on orders after 9 PM.",
      DiscountType: "Flat",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 111,
      IsActive: true,
      MenuItemType: "All",
      MenuItemId: 11,
      DiscountAmount: 5,
      OfferDetails: "Valid after 9 PM."
    },
    {
      DiscountId: 12,
      Name: "Tea Time",
      Description: "Get 20% off on all teas.",
      DiscountType: "Percentage",
      StartDate: "2024-07-01",
      EndDate: "2024-07-31",
      CafeId: 112,
      IsActive: true,
      MenuItemType: "Drinks",
      MenuItemId: 12,
      DiscountAmount: 20,
      OfferDetails: "Valid from 3 PM to 5 PM."
    },
];  


const INITIAL_VISIBLE_COLUMNS = ["Name", "Description", "DiscountType", "StartDate", "EndDate", "MenuItemType", "DiscountAmount", "actions"];

type Discount = typeof discountData[0];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "DiscountAmount",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(discountData.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
  
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid)) as { name: string; uid: string; sortable: boolean }[];
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredDiscounts = [...discountData]; // Use discountData

    if (hasSearchFilter) {
      filteredDiscounts = filteredDiscounts.filter((discount) =>
        discount.Name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredDiscounts;
  }, [discountData, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Discount, b: Discount) => {
      const first = a[sortDescriptor.column as keyof Discount] as string | number;
      const second = b[sortDescriptor.column as keyof Discount] as string | number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((discount: Discount, columnKey: React.Key) => {
    const cellValue = discount[columnKey as keyof Discount];

    switch (columnKey) {
      case "Name":
        return cellValue;
      case "Description":
        return cellValue;
      case "DiscountType":
        return cellValue;
      case "StartDate":
        return cellValue;
      case "EndDate":
        return cellValue;
      case "MenuItemType":
        return cellValue;
      case "DiscountAmount":
        return `${cellValue}%`;
      case "OfferDetails":
        return cellValue;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
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
        <h1 className="text-2xl text-white font-bold">Discount List</h1>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by discount name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 mt-8 px-10">
            Add New Discount
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {discountData.length} discounts</span> {/* Updated text */}
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
    onSearchChange,
    onRowsPerPageChange,
    discountData.length, // Updated reference
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
        <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
      </div>
      
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Discounts table with custom cells, pagination, and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
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
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item) => (
          <TableRow key={item.DiscountId} className="hover:bg-gray cursor-pointer">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}