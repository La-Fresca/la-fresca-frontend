export type Food = {
  id?: string;
  foodId?: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  available?: number;
  deleted?: number;
  cafeId: string;
  categories: string[];
  discountStatus?: string;
  discountId?: string;
  rating?: number;
  features: { name: string; levels: string[]; additionalPrices: number[] }[];
};
