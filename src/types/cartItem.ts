export type CartItem = {
  id?: string;
  name: string;
  description: string;
  image: string;
  menuItemId?: string;
  menuItemType: string;
  userId: string;
  quantity: number;
  customFeatures: CustomFeature[];
  itemTotalPrice: number;
};

export type CustomFeature = {
  name: string;
  levels: number;
};
