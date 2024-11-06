import React from 'react';
const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'CONTACT', uid: 'contact', sortable: true },
  { name: 'MANAGER', uid: 'manager' },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Inactive', uid: 'inactive' },
];

const branches = [
  {
    id: 1,
    name: 'Borella Branch',
    contact: '0771234567',
    status: 'active',
    manager: 'Mr. John Doe',
  },
  {
    id: 2,
    name: 'Kadawatha Branch',
    contact: '0771234567',
    status: 'active',
    manager: 'Ms. Jane Doe',
  },
  {
    id: 3,
    name: 'Piliyandala Branch',
    contact: '0771234567',
    status: 'inactive',
    manager: 'Ms. Jenny fisher',
  },
  {
    id: 4,
    name: 'Malabe Branch',
    contact: '0771234567',
    status: 'inactive',
    manager: 'Mr. Russel Peters',
  },
  {
    id: 5,
    name: 'Kaduwela Branch',
    contact: '0771234567',
    status: 'active',
    manager: 'Mr. Harry Potter',
  },
  {
    id: 6,
    name: 'Dambulla Branch',
    contact: '0771234567',
    status: 'active',
    manager: 'Mr. Ian Botham',
  },
];

export { columns, branches, statusOptions };
