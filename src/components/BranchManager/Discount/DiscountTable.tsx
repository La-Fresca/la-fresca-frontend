import React, { useState, useMemo, useCallback } from 'react';
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
import { SearchIcon } from '../Tables/NextTable/SearchIcon';
import { swalConfirm } from '@/components/UI/SwalConfirm';
import { ChevronDownIcon } from '../Tables/NextTable/ChevronDownIcon';
import { VerticalDotsIcon } from '../Tables/NextTable/VerticalDotsIcon';
import { useNavigate } from 'react-router-dom';

const columns = [
  { name: 'Name', uid: 'name' },
  { name: 'Menu Item', uid: 'menuItemType' },
  { name: 'Discount Amount', uid: 'discountAmount' },
  { name: 'Discount Type', uid: 'discountType' },
  { name: 'Start Date', uid: 'startDate' },
  { name: 'End Date', uid: 'endDate' },
  { name: 'Actions', uid: 'actions' },
];

const statusOptions = [
  { name: 'All', uid: 'All' },
  { name: 'Percentage', uid: 'Percentage' },
  { name: 'Fixed', uid: 'Fixed' },
];

interface Discount {
  description: string;
  name: string;
  menuItemType: string;
  menuItemId: string;
  discountAmount: number;
  discountType: string;
  amount: number;
  offerDetails: string;
  startDate: string;
  endDate: string;
}

interface DiscountTableProps {
  filterStatus: string;
  toggleEditModal: (discount: Discount | null) => void;
}

const DiscountTable: React.FC<DiscountTableProps> = ({
  filterStatus,
  toggleEditModal,
}) => {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      description: '10% off on main course',
      name: 'Main Course Discount',
      menuItemType: 'Main Course',
      menuItemId: 'MC001',
      discountAmount: 10,
      discountType: 'Percentage',
      amount: 0,
      offerDetails: 'Applicable to all main course items',
      startDate: '2024-11-01',
      endDate: '2024-12-01',
    },
    {
      description: '20% off on beverages',
      name: 'Beverage Discount',
      menuItemType: 'Beverages',
      menuItemId: 'BV002',
      discountAmount: 20,
      discountType: 'Percentage',
      amount: 0,
      offerDetails: 'Applicable to all beverages',
      startDate: '2024-11-05',
      endDate: '2024-12-05',
    },
  ]);

  const [filterValue, setFilterValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filtered = [...discounts];
    if (hasSearchFilter) {
      filtered = filtered.filter((discount) =>
        discount.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (filterStatus !== 'All') {
      filtered = filtered.filter(
        (discount) => discount.discountType === filterStatus,
      );
    }
    return filtered;
  }, [discounts, filterValue, filterStatus]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback(
    (discount: Discount, columnKey: keyof Discount) => {
      const cellValue = discount[columnKey];

      switch (columnKey) {
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
                  <DropdownItem onClick={() => toggleEditModal(discount)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDelete(discount)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        case 'startDate':
        case 'endDate':
          return new Date(cellValue as string).toLocaleDateString();
        default:
          return cellValue;
      }
    },
    [],
  );

  const handleDelete = (discount: Discount) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the discount: ${discount.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setDiscounts((prevDiscounts) =>
          prevDiscounts.filter((d) => d.menuItemId !== discount.menuItemId),
        );
        Swal.fire('Deleted!', 'The discount has been deleted.', 'success');
      }
    });
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-white font-bold">Discounts List</h1>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] dark:bg-[#ffffff14] rounded-lg border bg-[#aaaaaa14] border-[#aaaaaa66] dark:border-[#54545466]"
            placeholder="Search by name..."
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
                  Discount Type
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Discount Type Filter"
                closeOnSelect={true}
                selectedKeys={[filterStatus]}
                selectionMode="single"
                className="dark:bg-[#373737] bg-whiten rounded-lg dark:text-white text-[#3a3a3a] border border-[#b3b3b360]"
              >
                {statusOptions.map((status) => (
                  <DropdownItem
                    key={status.uid}
                    className="capitalize hover:bg-[#aaaaaa17] rounded-lg"
                  >
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 rounded-xl"
              onClick={() => navigate('add')}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} discounts
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small hover:bg-[#373737]"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              value={rowsPerPage}
            >
              <option value="5" className="bg-[#373737] text-white">
                5
              </option>
              <option value="10" className="bg-[#373737] text-white">
                10
              </option>
              <option value="15" className="bg-[#373737] text-white">
                15
              </option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, filteredItems.length, rowsPerPage, filterStatus]);

  const bottomContent = useMemo(() => {
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
            onPress={() => setPage(page - 1)}
            className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040] py-[18px]"
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={() => setPage(page + 1)}
            className="rounded-xl dark:bg-[#ffffff1e] border bg-[#aaaaaa20] border-[#aaaaaa66] dark:text-[#bcbcbc] text-black hover:bg-[#aaaaaa49] hover:dark:bg-[#404040] py-[18px]"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Discount table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="outside"
      classNames={{
        wrapper: ['max-h-[382px]', 'max-w-3xl'],
        th: [
          'dark:bg-[#373737] translate-y-[-16px] bg-[#aaaaaa20] dark:text-white text-[#3a3a3a] h-[45px]',
        ],
        td: [
          'group-data-[first=true]:first:before:rounded-none',
          'group-data-[first=true]:last:before:rounded-none',
          'group-data-[middle=true]:before:rounded-none',
          'group-data-[last=true]:first:before:rounded-none',
          'group-data-[last=true]:last:before:rounded-none',
        ],
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.menuItemId}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof Discount)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DiscountTable;
