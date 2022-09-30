import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { Cliente } from 'src/models/crypto_order';
import ClientsTable from './ClientsTable';
import RecentOrdersTable from './ClientsTable';


function Clients() {
  const [dados, setDados] = useState<Cliente[]>([]);

  async function carregar(){
    const {data} = await api.get("/usuarios");
    setDados(data);
  }

  useEffect(()=>{
    carregar();
  }, [])

  return (
    <Card>
      <ClientsTable clients={dados} />
    </Card>
  );
}

export default Clients;
