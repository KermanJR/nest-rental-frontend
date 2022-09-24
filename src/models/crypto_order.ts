export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: string;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
