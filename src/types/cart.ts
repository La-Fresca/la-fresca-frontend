export type Cart = {
  id?: string;
  userId: string;
  totalPrice: number;
  items: CartItem[];
};

export type CartItem = {
  name: string;
  menuItemId: string;
  unitPrice: number;
  itemTotalPrice: number;
  customFeatures: CustomFeature[];
  quantity: number;
};

export type CustomFeature = {
  name: string;
  levels: string[];
  additionalPrices: number[];
};
