const columns = [
  { name: 'Combo Name', uid: 'name', sortable: true },
  { name: 'Price', uid: 'price', sortable: true },
  { name: 'Food Items', uid: 'items' },
  { name: 'Actions', uid: 'actions' },
];

const combos = [
  {
    id: '66818e4d48b0cf121b29a60b',
    name: 'Italian Specials',
    description: 'A variety of Italian dishes',
    price: 29.99,
    image: 'menu_image_url',
    available: 1,
    cafeId: 'cafe123',
    deleted: 0,
    foodIds: ['food1', 'food2', 'food3'],
  },
  {
    id: '6681a3b05a0ac5263cc04109',
    name: 'Sri Lankan Specials',
    description: 'A variety of Italian dishes',
    price: 29.99,
    image: 'menu_image_url',
    available: 1,
    cafeId: 'cafe123',
    deleted: 0,
    foodIds: ['food1', 'food2', 'food3'],
  },
];

export { columns, combos };
