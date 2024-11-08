export type FoodCombo = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  available?: number;
  cafeId: string;
  foodIds: string[];
  discountStatus?: string;
  discountId?: string;
  rating: number;
  foodNames?: string[];
  status: number;
};
