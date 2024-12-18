export type Order = {
  id?: string;
  orderType: string;
  totalAmount: number;
  orderStatus: string;
  cafeId: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];

  customerId?: string;
  deliveryPersonId?: string;
  location?: string;
  contactNo?: string;

  cashierId?: string;
  waiterId?: string;
};

export type OrderItem = {
  menuItemType: string;
  foodId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  addedFeatures: AddedFeature[];
};

export type AddedFeature = {
  name: string;
  level: string;
  additionalPrice: number;
};

export type OrderItemStatus = {
  orderId: string;
  itemId: string;
  status: string;
};

export type OrderStatus = {
  id: string;
  orderStatus: string;
};


export type Deliverystat = {
  queue: number;
  history: number;
};
