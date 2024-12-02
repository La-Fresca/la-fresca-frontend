const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Name", uid: "firstName", sortable: true},
  {name: "Email", uid: "email"},
  {name: "Phone Number", uid: "phoneNumber", sortable: true},
  {name: "Address", uid: "address", sortable: true},
  {name: "Role", uid: "role", sortable: true},
  {name: "Username", uid: "username", sortable: true},
  {name: "Actions", uid: "actions"}
];

const statusOptions = [
  {name: "Open", uid: "OPEN"},
  {name: "Closed", uid: "CLOSED"},
];

export {columns, statusOptions};
