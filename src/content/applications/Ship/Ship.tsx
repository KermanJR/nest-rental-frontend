import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { Frete } from 'src/models/crypto_order';
import ShipTable from './ShipTable';


function Ship() {
  const [dados, setDados] = useState<Frete[]>([]);

  async function carregar(){
    const {data} = await api.get("/fretes");
    console.log(data)
    setDados(data);
  }

  useEffect(()=>{
    carregar();
  }, [])

  return (
    <Card>
      <ShipTable cryptoOrders={dados} />
    </Card>
  );
}

export default Ship;
