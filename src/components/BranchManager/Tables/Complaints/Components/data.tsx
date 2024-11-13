const columns = [
  {name: "Title", uid: "name", sortable: true},
  {name: "Description", uid: "price", sortable: true},
  {name: "Date", uid: "available", sortable: true},
  {name: "Status", uid: "status", sortable: true}
];

const statusOptions = [
  {name: "Unread", uid: '0'},
  {name: "Read", uid: '1'},
  {name: "Resolved", uid: '2'},
];

export {columns, statusOptions};
