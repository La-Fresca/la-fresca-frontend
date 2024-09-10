const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Item Name", uid: "name", sortable: true},
  {name: "Quentity", uid: "qty", sortable: true},
  {name: "Expire Date", uid: "EXPDate"},
  {name: "Supplier Name", uid: "supplier", sortable: true},
  {name: "Unit Price", uid: "UPrice", sortable: true},
  {name: "Actions", uid: "actions"},
];

const statusOptions = [
  {name: "High stock", uid: "High stock"},
  {name: "Low stock", uid: "Low stock"},
  {name: "Out of stock", uid: "Out of stock"},
];

const users = [
  {
    id: 1,
    name: "Coffee Beans",
    qty: "20",
    EXPDate: "2024/08/20",
    supplier: "Dave",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "kg",
    UPrice: 15,
  },
  {
    id: 2,
    name: "Sugar",
    qty: "20",
    EXPDate: "2024/08/20",
    supplier: "John",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "kg",
    UPrice: 10,
  }
];

export {columns, users, statusOptions};
