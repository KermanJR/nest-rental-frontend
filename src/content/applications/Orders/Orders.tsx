import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { Pedido } from 'src/models/crypto_order';
import OrdersTable from './OrdersTable';


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
      <OrdersTable cryptoOrders={dados} panel={false}/>
    </Card>
  );
}

export default Orders;
