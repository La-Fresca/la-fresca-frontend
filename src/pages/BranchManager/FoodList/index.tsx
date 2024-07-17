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
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { capitalize } from "./utils";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["foodId", "name", "price", "availability", "cafeId", "category", "discountStatus", "discountId", "features", "actions"];

type Food = {
    id: number;
    foodId: string;
    name: string;
    price: number;
    availability: string;
    cafeId: string;
    category: string;
    discountStatus: string;
    discountId: string;
    features: { feature: string; amount: string }[];
};

const foods: Food[] = [
    {
        id: 1,
        foodId: 'F001',
        name: 'Pizza',
        price: 12.99,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Fast Food',
        discountStatus: 'Active',
        discountId: 'D001',
        features: [
            { feature: 'Cheese', amount: 'Extra' },
            { feature: 'Size', amount: 'Large' },
        ],
    },
    {
        id: 2,
        foodId: 'F002',
        name: 'Burger',
        price: 8.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Fast Food',
        discountStatus: 'Paused',
        discountId: 'D002',
        features: [
            { feature: 'Sauce', amount: 'Regular' },
            { feature: 'Size', amount: 'Medium' },
        ],
    },
    {
        id: 3,
        foodId: 'F003',
        name: 'Salad',
        price: 6.49,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Healthy',
        discountStatus: 'Vacation',
        discountId: 'D003',
        features: [
            { feature: 'Greens', amount: 'Fresh' },
            { feature: 'Dressing', amount: 'Light' },
        ],
    },
    {
        id: 4,
        foodId: 'F004',
        name: 'Pasta',
        price: 10.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Italian',
        discountStatus: 'Active',
        discountId: 'D004',
        features: [
            { feature: 'Sauce', amount: 'Tomato' },
            { feature: 'Cheese', amount: 'Parmesan' },
        ],
    },
    {
        id: 5,
        foodId: 'F005',
        name: 'Sandwich',
        price: 5.99,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Snack',
        discountStatus: 'Active',
        discountId: 'D005',
        features: [
            { feature: 'Bread', amount: 'Whole Wheat' },
            { feature: 'Fillings', amount: 'Ham, Cheese, Lettuce' },
        ],
    },
    {
        id: 6,
        foodId: 'F006',
        name: 'Sushi',
        price: 14.99,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Japanese',
        discountStatus: 'Active',
        discountId: 'D006',
        features: [
            { feature: 'Fish', amount: 'Salmon' },
            { feature: 'Rice', amount: 'Sushi Rice' },
        ],
    },
    {
        id: 7,
        foodId: 'F007',
        name: 'Steak',
        price: 19.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Grill',
        discountStatus: 'Active',
        discountId: 'D007',
        features: [
            { feature: 'Cut', amount: 'Ribeye' },
            { feature: 'Cook', amount: 'Medium Rare' },
        ],
    },
    {
        id: 8,
        foodId: 'F008',
        name: 'Curry',
        price: 11.49,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Indian',
        discountStatus: 'Paused',
        discountId: 'D008',
        features: [
            { feature: 'Spice Level', amount: 'Medium' },
            { feature: 'Type', amount: 'Vegetarian' },
        ],
    },
    {
        id: 9,
        foodId: 'F009',
        name: 'Fish and Chips',
        price: 9.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'British',
        discountStatus: 'Active',
        discountId: 'D009',
        features: [
            { feature: 'Fish', amount: 'Cod' },
            { feature: 'Side', amount: 'Chips' },
        ],
    },
    {
        id: 10,
        foodId: 'F010',
        name: 'Tacos',
        price: 7.99,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Mexican',
        discountStatus: 'Active',
        discountId: 'D010',
        features: [
            { feature: 'Meat', amount: 'Beef' },
            { feature: 'Tortilla', amount: 'Corn' },
        ],
    },
    {
        id: 11,
        foodId: 'F011',
        name: 'Ramen',
        price: 10.49,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Japanese',
        discountStatus: 'Active',
        discountId: 'D011',
        features: [
            { feature: 'Broth', amount: 'Tonkotsu' },
            { feature: 'Toppings', amount: 'Egg, Pork, Bamboo Shoots' },
        ],
    },
    {
        id: 12,
        foodId: 'F012',
        name: 'Pho',
        price: 8.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Vietnamese',
        discountStatus: 'Active',
        discountId: 'D012',
        features: [
            { feature: 'Noodles', amount: 'Rice Noodles' },
            { feature: 'Broth', amount: 'Beef' },
        ],
    },
    {
        id: 13,
        foodId: 'F013',
        name: 'Lasagna',
        price: 12.99,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Italian',
        discountStatus: 'Active',
        discountId: 'D013',
        features: [
            { feature: 'Layers', amount: 'Cheese, Meat, Pasta' },
            { feature: 'Sauce', amount: 'Tomato' },
        ],
    },
    {
        id: 14,
        foodId: 'F014',
        name: 'Chicken Wings',
        price: 9.49,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Appetizer',
        discountStatus: 'Paused',
        discountId: 'D014',
        features: [
            { feature: 'Flavor', amount: 'Buffalo' },
            { feature: 'Side', amount: 'Blue Cheese Dressing' },
        ],
    },
    {
        id: 15,
        foodId: 'F015',
        name: 'Fish Tacos',
        price: 8.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Mexican',
        discountStatus: 'Active',
        discountId: 'D015',
        features: [
            { feature: 'Fish', amount: 'Mahi Mahi' },
            { feature: 'Tortilla', amount: 'Flour' },
        ],
    },
    {
        id: 16,
        foodId: 'F016',
        name: 'Caesar Salad',
        price: 7.49,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Salad',
        discountStatus: 'Active',
        discountId: 'D016',
        features: [
            { feature: 'Greens', amount: 'Romaine Lettuce' },
            { feature: 'Dressing', amount: 'Caesar' },
        ],
    },
    {
        id: 17,
        foodId: 'F017',
        name: 'Pad Thai',
        price: 11.99,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Thai',
        discountStatus: 'Active',
        discountId: 'D017',
        features: [
            { feature: 'Noodles', amount: 'Rice Noodles' },
            { feature: 'Protein', amount: 'Shrimp' },
        ],
    },
    {
        id: 18,
        foodId: 'F018',
        name: 'Hamburger',
        price: 6.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Fast Food',
        discountStatus: 'Paused',
        discountId: 'D018',
        features: [
            { feature: 'Condiments', amount: 'Ketchup, Mustard' },
            { feature: 'Extras', amount: 'Pickles, Onion' },
        ],
    },
    {
        id: 19,
        foodId: 'F019',
        name: 'Ceviche',
        price: 13.99,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Seafood',
        discountStatus: 'Active',
        discountId: 'D019',
        features: [
            { feature: 'Fish', amount: 'Snapper' },
            { feature: 'Citrus', amount: 'Lime' },
        ],
    },
    {
        id: 20,
        foodId: 'F020',
        name: 'Fajitas',
        price: 14.49,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Mexican',
        discountStatus: 'Active',
        discountId: 'D020',
        features: [
            { feature: 'Meat', amount: 'Chicken' },
            { feature: 'Toppings', amount: 'Peppers, Onions' },
        ],
    },
    {
        id: 21,
        foodId: 'F021',
        name: 'Pulled Pork Sandwich',
        price: 9.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Sandwich',
        discountStatus: 'Active',
        discountId: 'D021',
        features: [
            { feature: 'Meat', amount: 'Pulled Pork' },
            { feature: 'Sauce', amount: 'BBQ' },
        ],
    },
    {
        id: 22,
        foodId: 'F022',
        name: 'Ravioli',
        price: 11.99,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Italian',
        discountStatus: 'Active',
        discountId: 'D022',
        features: [
            { feature: 'Filling', amount: 'Cheese' },
            { feature: 'Sauce', amount: 'Tomato Cream' },
        ],
    },
    {
        id: 23,
        foodId: 'F023',
        name: 'Sashimi',
        price: 16.99,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Japanese',
        discountStatus: 'Active',
        discountId: 'D023',
        features: [
            { feature: 'Fish', amount: 'Tuna, Salmon' },
            { feature: 'Presentation', amount: 'Raw' },
        ],
    },
    {
        id: 24,
        foodId: 'F024',
        name: 'Gyro',
        price: 7.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Greek',
        discountStatus: 'Active',
        discountId: 'D024',
        features: [
            { feature: 'Meat', amount: 'Lamb, Beef' },
            { feature: 'Wrap', amount: 'Pita Bread' },
        ],
    },
    {
        id: 25,
        foodId: 'F025',
        name: 'Philly Cheesesteak',
        price: 12.49,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Sandwich',
        discountStatus: 'Active',
        discountId: 'D025',
        features: [
            { feature: 'Meat', amount: 'Beef' },
            { feature: 'Cheese', amount: 'Provolone' },
        ],
    },
    {
        id: 26,
        foodId: 'F026',
        name: 'Maki Roll',
        price: 9.99,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Japanese',
        discountStatus: 'Active',
        discountId: 'D026',
        features: [
            { feature: 'Ingredients', amount: 'Cucumber, Avocado' },
            { feature: 'Fish', amount: 'Tuna, Salmon' },
        ],
    },
    {
        id: 27,
        foodId: 'F027',
        name: 'Pierogi',
        price: 10.99,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Polish',
        discountStatus: 'Active',
        discountId: 'D027',
        features: [
            { feature: 'Filling', amount: 'Potato, Cheese' },
            { feature: 'Side', amount: 'Sour Cream' },
        ],
    },
    {
        id: 28,
        foodId: 'F028',
        name: 'Chicken Parmesan',
        price: 13.99,
        availability: 'Available',
        cafeId: 'C001',
        category: 'Italian',
        discountStatus: 'Active',
        discountId: 'D028',
        features: [
            { feature: 'Meat', amount: 'Chicken' },
            { feature: 'Cheese', amount: 'Parmesan' },
        ],
    },
    {
        id: 29,
        foodId: 'F029',
        name: 'Falafel Wrap',
        price: 8.49,
        availability: 'Available',
        cafeId: 'C003',
        category: 'Middle Eastern',
        discountStatus: 'Active',
        discountId: 'D029',
        features: [
            { feature: 'Falafel', amount: 'Chickpea' },
            { feature: 'Wrap', amount: 'Pita Bread' },
        ],
    },
    {
        id: 30,
        foodId: 'F030',
        name: 'Chili Con Carne',
        price: 10.49,
        availability: 'Available',
        cafeId: 'C002',
        category: 'Mexican',
        discountStatus: 'Active',
        discountId: 'D030',
        features: [
            { feature: 'Meat', amount: 'Beef' },
            { feature: 'Beans', amount: 'Kidney Beans' },
        ],
    },
    // Add more food items as needed
];
const columns = [
    { name: 'Name', uid: 'name' },
    { name: 'Price', uid: 'price' },
    { name: 'Availability', uid: 'availability' },
    { name: 'Cafe ID', uid: 'cafeId' },
    { name: 'Category', uid: 'category' },
    { name: 'Discount Status', uid: 'discountStatus' },
    { name: 'Discount ID', uid: 'discountId' },
    { name: 'Features', uid: 'features' },
    { name: 'Actions', uid: 'actions' },
];

export default function FoodList() {
    const [filterValue, setFilterValue] = React.useState('');
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: 'price',
        direction: 'ascending',
    });
    const [page, setPage] = React.useState(1);
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        // if (visibleColumns === 'all') return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredFoods = [...foods];

        if (hasSearchFilter) {
            filteredFoods = filteredFoods.filter((food) =>
                food.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredFoods;
    }, [foods, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a] as number;
            const second = b[sortDescriptor.column as keyof typeof b] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((food:any, columnKey:any) => {
        const cellValue = food[columnKey as keyof typeof food];

        switch (columnKey) {
            case 'name':
                return cellValue;
            case 'price':
                return `$${cellValue}`;
            case 'features':
                return (cellValue as { feature: string; amount: string }[])
                    .map((f) => `${f.feature}: ${f.amount}`)
                    .join(', ');
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
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return String(cellValue);
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

    const onRowsPerPageChange = React.useCallback((e:any) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value:any) => {
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
                <h1 className="text-2xl text-white font-bold">Food List</h1>
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 mt-8 px-10">
                        Add New Item
                    </Button>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {foods.length} foods</span>
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
    }, [filterValue, onSearchChange, onRowsPerPageChange, foods.length]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-center items-center">

                <div className="hidden sm:flex w-[50%] justify-center gap-5">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Pagination
                        isCompact
                        // showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={setPage}
                    />
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [page, pages]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: 'max-h-[382px]',
            }}
            // sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            // onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns} className="bg-gray">
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === 'actions' ? 'center' : 'start'}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={'No foods found'} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id} className="hover:bg-gray cursor-pointer">
                        {(columnKey) => (
                            <TableCell className=" px-4 py-3">
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}