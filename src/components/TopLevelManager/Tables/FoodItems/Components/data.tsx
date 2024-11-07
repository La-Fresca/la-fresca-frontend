const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Name", uid: "name", sortable: true},
  {name: "Price", uid: "price", sortable: true},
  {name: "Availability", uid: "available", sortable: true},
  {name: "Discount", uid: "discountStatus"},
  {name: "Features", uid: "features", sortable: true},
  {name: "Status", uid: "status", sortable: true},
  {name: "Actions", uid: "actions"}
];

const statusOptions = [
  {name: "Approved", uid: 0},
  {name: "Pending", uid: 2},
];

export {columns, statusOptions};
