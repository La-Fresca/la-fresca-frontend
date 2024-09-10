const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Item Name", uid: "name", sortable: true},
  {name: "Quantity", uid: "availableAmount", sortable: true},
  {name: "Predicted Stockout Date", uid: "predictedStockDate"},
  {name: "Status", uid: "status", sortable: true},
  {name: "Actions", uid: "actions"},
];

const statusOptions = [
  {name: "High stock", uid: "High stock"},
  {name: "Low stock", uid: "Low stock"},
  {name: "Out of stock", uid: "Out of stock"},
];

export {columns, statusOptions};
