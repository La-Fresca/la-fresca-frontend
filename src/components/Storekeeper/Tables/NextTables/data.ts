const columns = [
  { name: 'GRN', uid: 'id', sortable: true },
  { name: 'Date', uid: 'date', sortable: true },
  { name: 'Supplier', uid: 'supplier', sortable: true },
  { name: 'Total Quantitiy', uid: 'quantity', sortable: true },
  { name: 'Remaining Quantity', uid: 'stock' },
  { name: 'Actions', uid: 'actions' },
];

const grns = [
  {
    id: 'GRN202407220001',
    date: '22 July 2024',
    supplier: 'Supplier 1',
    quantity: 100,
    stock: 50,
  },
  {
    id: 'GRN202407220002',
    date: '22 July 2024',
    supplier: 'Supplier 2',
    quantity: 100,
    stock: 50,
  },
];

export { columns, grns };
