import { Card } from '@mui/material';
import ProductsTable from './ProductsTable';
import { Produto } from 'src/models/crypto_order';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';

function Products() {
  const [dados, setDados] = useState<Produto[]>([]);

  async function carregar(){
    const {data} = await api.get("/produtos");
    setDados(data);
  }

  useEffect(()=>{
    carregar();
  }, [])

  return (
    <Card>
      <ProductsTable productOrders={dados} />
    </Card>
  );
}

export default Products;
