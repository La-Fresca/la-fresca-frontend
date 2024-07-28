export type Cart = {
  menuItemId?: string;
  menuItemType: string;
  userId: string;
  quantity: number;
  customFeatures: CustomFeature[];
};

export type CustomFeature = {
  name: string;
  levels: number;
};
