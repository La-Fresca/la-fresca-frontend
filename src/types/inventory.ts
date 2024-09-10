export type Inventory = {
  id?: number;
  name: string;
  availableAmount: number;
  lowerLimit: number;
  unit: string;
  cafeId: string;
  image: string;
  predictedStockoutDate: string;
  deleted: number;
  status: string;
};
