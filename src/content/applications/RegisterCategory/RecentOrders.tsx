import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { Categoria } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';


function RecentOrders() {
  const [dados, setDados] = useState<Categoria[]>([]);

  async function carregar(){
    const {data} = await api.get("/categorias");
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

export default RecentOrders;
