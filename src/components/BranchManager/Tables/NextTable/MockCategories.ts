const columns = [
  { name: 'Category Name', uid: 'name', sortable: true },
  { name: 'Status', uid: 'status', sortable: true },
  { name: 'Category Description', uid: 'description' },
  { name: 'Actions', uid: 'actions' },
];

const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Inactive', uid: 'inactive' },
];

const categories = [
  {
    id: 1,
    name: 'Non-Vegetarian',
    status: 'active',
    description: 'Non-Vegetarian food items',
  },
  {
    id: 2,
    name: 'Vegetarian',
    status: 'inactive',
    description: 'Vegetarian food items',
  },
];

export { columns, categories, statusOptions };
