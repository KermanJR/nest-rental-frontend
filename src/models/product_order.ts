export type ProductOrderStatus = 'completed' | 'pending' | 'failed';

export interface ProductOrder {
  id: string;
  status: ProductOrderStatus;
  orderDetails: string;
  orderDate: string;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amount: number;
  productCurrency: string;
  currency: string;
}
