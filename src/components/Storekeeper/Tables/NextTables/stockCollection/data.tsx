const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Item Name", uid: "Name", sortable: true},
  {name: "Quentity", uid: "AvailableAmount", sortable: true},
  {name: "Predicted Stockout Date", uid: "PredictedStockoutDate"},
  {name: "Status", uid: "Status", sortable: true},
  {name: "Actions", uid: "actions"},
  {name: "Unit", uid: "Unit"},
];

const statusOptions = [
  {name: "High stock", uid: "High stock"},
  {name: "Low stock", uid: "Low stock"},
  {name: "Out of stock", uid: "Out of stock"},
];

export {columns, statusOptions};
