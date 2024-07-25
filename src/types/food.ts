export type Food = {
  id?: number;
  foodId?: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  available?: number;
  deleted?: number;
  cafeId: string;
  category: string[];
  discountStatus?: string;
  discountId?: string;
  rating?: number;
  features: { name: string; levels: string[]; additionalPrices: number[] }[];
};
