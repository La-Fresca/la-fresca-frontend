const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Branch Name", uid: "branchName", sortable: true},
  {name: "Address", uid: "address", sortable: true},
  {name: "Contact Number", uid: "contactNo"},
  {name: "Status", uid: "status", sortable: true},
  {name: "Actions", uid: "actions"}
];

const statusOptions = [
  {name: "Open", uid: "Open"},
  {name: "Close", uid: "Close"},
];

export {columns, statusOptions};
