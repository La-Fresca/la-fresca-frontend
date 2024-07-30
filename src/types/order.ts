export type Order = {
    id: number;
    orderType: string;
    totalAmount: number;
    orderStatus: string;
    cafeId: string;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];

    CustomerId?: string;
    deliveryPersonId?: string;
    location?: string;
    contactNo?: string;

    cashierId?: string;
    waiterId?: string;
  };


export type OrderItem = {
    foodId: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    orderStatus: string;
    addedFeature: AddedFeature[];
  };
  

export type AddedFeature = {
    name: string;
    level: string;
    additionalPrice: number;
  };