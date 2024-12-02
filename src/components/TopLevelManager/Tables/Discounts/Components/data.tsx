const columns = [
  {name: "Name", uid: "name", sortable: true},
  {name: "Description", uid: "description", sortable: true},
  {name: "Discount Type", uid: "discountType", sortable: true},
  {name: "Menu Item Type", uid: "menuItemType"},
  {name: "Amount", uid: "amount", sortable: true},
  {name: "Discount Amount", uid: "discountAmount", sortable: true},
  {name: "Start Date", uid: "startDate", sortable: true},
  {name: "End Date", uid: "endDate", sortable: true},
  {name: "Offer Details", uid: "offerDetails", sortable: true},
  {name: "Status", uid: "status", sortable: true}
];

const statusOptions = [
  {name: "Approved", uid: 0},
  {name: "Pending", uid: 2},
];

export {columns, statusOptions};
