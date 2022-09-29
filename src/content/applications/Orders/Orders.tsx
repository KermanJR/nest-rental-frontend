import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { Pedido } from 'src/models/crypto_order';
import RecentOrdersTable from './OrdersTable';


function Orders() {
  const [dados, setDados] = useState<Pedido[]>([]);

  async function carregar(){
    const {data} = await api.get("/pedidos/dashboard");
    setDados(data);
  }

  useEffect(()=>{
    carregar();
  }, [])

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={dados} />
    </Card>
  );
}

export default Orders;
