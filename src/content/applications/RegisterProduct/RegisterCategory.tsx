import { Card } from '@mui/material';
import RegisterCategoryTable from './RegisterCategoryTable';
import { ProductOrder } from 'src/models/product_order';

function RegisterCategory() {
  const productOrders: ProductOrder[] = [
    {
      id: '1',
      orderDetails: 'Ecolift 70',
      orderDate: "23/09/2022",
      status: 'completed',
      orderID: 'VUVX709ET7BY',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amount: 56787,
      productCurrency: 'ETH',
      currency: 'R$'
    },
    {
      id: '2',
      orderDetails: 'Lâmina 1030P',
      orderDate: "22/09/2022",
      status: 'completed',
      orderID: '23M3UOG65G8K',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amount: 8734587,
      productCurrency: 'BTC',
      currency: 'R$'
    },
    {
      id: '3',
      orderDetails: 'LiftPod FT140',
      orderDate: "22/09/2022",
      status: 'failed',
      orderID: 'F6JHK65MS818',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',

      amount: 8734587,
      productCurrency: 'BTC',
      currency: 'R$'
    },
    {
      id: '4',
      orderDetails: 'Toucan T26 E',
      orderDate: "20/09/2022",
      status: 'completed',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amount: 8734587,
      productCurrency: 'BTC',
      currency: 'R$'
    },
    {
      id: '5',
      orderDetails: '30 AM',
      orderDate: "21/09/2022",
      status: 'pending',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amount: 8734587,
      productCurrency: 'BTC',
      currency: 'R$'
    }
  ];

  return (
    <Card>
      <RegisterCategoryTable productOrders={productOrders} />
    </Card>
  );
}

export default RegisterCategory;
