const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Branch Name", uid: "name", sortable: true},
  {name: "Address", uid: "address", sortable: true},
  {name: "Contact Number", uid: "contactNo"},
  {name: "Status", uid: "status", sortable: true},
  {name: "Actions", uid: "actions"}
];

const statusOptions = [
  {name: "Open", uid: "OPEN"},
  {name: "Closed", uid: "CLOSED"},
];

export {columns, statusOptions};
