import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { Pedido } from 'src/models/crypto_order';
import DevolutionTable from './DevolutionTable';


function Devolution() {
  const [dados, setDados] = useState<Pedido[]>([]);

  async function carregar(){
    const {data} = await api.get("/api/devolucoes");
    setDados(data);
  }

  useEffect(()=>{
    carregar();
  }, [])

  return (
    <Card>
      <DevolutionTable cryptoOrders={dados} panel={true}/>
    </Card>
  );
}

export default Devolution;
