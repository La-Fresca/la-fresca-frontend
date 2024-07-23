export type Food = {
  id: number;
  foodId: string;
  name: string;
  image: string;
  price: number;
  availability: number;
  cafeId: string;
  category: string[];
  discountStatus: string;
  discountId: string;
  features: { name: string; levels: string[]; additionalPrices: number[] }[];
};
