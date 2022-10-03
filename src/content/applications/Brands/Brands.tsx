import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { Marca } from 'src/models/crypto_order';
import BrandsTable from './BrandsTable';



function Brands() {
  const [dados, setDados] = useState<Marca[]>([]);

  async function carregar(){
    const {data} = await api.get("/marcas");
    console.log(data)
    setDados(data);
  }

  useEffect(()=>{
    carregar();
  }, [])

  return (
    <Card>
      <BrandsTable cryptoOrders={dados} panel={false}/>
    </Card>
  );
}

export default Brands;
