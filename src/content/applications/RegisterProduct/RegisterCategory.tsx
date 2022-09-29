import { Card } from '@mui/material';
import RegisterCategoryTable from './RegisterCategoryTable';
import { Produto } from 'src/models/crypto_order';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';

function RegisterCategory() {
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
      <RegisterCategoryTable productOrders={dados} />
    </Card>
  );
}

export default RegisterCategory;
