export type FoodCombo = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  available: 0;
  cafeId: string;
  deleted: 0;
  foodIds: string[];
  discountStatus?: string;
  discountId?: string;
  rating: number;
  foodNames?: string[];
};
