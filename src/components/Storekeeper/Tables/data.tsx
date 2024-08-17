const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Item Name", uid: "name", sortable: true},
  {name: "Quentity", uid: "qty", sortable: true},
  {name: "Predicted Stockout Date", uid: "PSDate"},
  {name: "Status", uid: "status", sortable: true},
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
    name: "Cofee Beans",
    qty: "20",
    PSDate: "2024/08/20",
    status: "High stock",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "kg",
    lowerLimit: 10,
  },
  {
    id: 2,
    name: "Sugar",
    qty: "20",
    PSDate: "2024/09/10",
    status: "Low stock",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "kg",
    lowerLimit: 10,
  },
  {
    id: 3,
    name: "Salt",
    qty: "20",
    PSDate: "2024/09/10",
    status: "Out of stock",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "kg",
    lowerLimit: 10,
  },
  {
    id: 4,
    name: "Salt",
    qty: "20",
    PSDate: "2024/09/10",
    status: "High stock",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "kg",
    lowerLimit: 10,
  },
  {
    id: 5,
    name: "Oil",
    qty: "20",
    PSDate: "2024/09/10",
    status: "Low stock",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "l",
    lowerLimit: 10,
  },
  {
    id: 6,
    name: "Salt",
    qty: "20",
    PSDate: "2024/09/10",
    status: "High stock",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "kg",
    lowerLimit: 10,
  },
  {
    id: 7,
    name: "Oil",
    qty: "20",
    PSDate: "2024/09/10",
    status: "Low stock",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    unit: "l",
    lowerLimit: 10,
  }
];

export {columns, users, statusOptions};
