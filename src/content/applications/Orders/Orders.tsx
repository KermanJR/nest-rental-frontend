import { Card } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { api } from 'src/api/api';
import { UserContext } from 'src/context/UserContext';
import { Pedido } from 'src/models/crypto_order';
import RecentOrdersTable from './OrdersTable';



function Orders() {
  const [dados, setDados] = useState<Pedido[]>([]);
  const [dadosPorUsuario, setDadosPorUsuario] = useState<Pedido[]>([]);
  const { usuario } = useContext(UserContext);



  async function carregar(){
    const {data} = await api.get("/pedidos/dashboard");
    setDados(data);
  }

  async function carregarPedidosPorId(){
    const {data} = await api.get(`/pedidos/${usuario?.id}`);
    setDadosPorUsuario(data);
  }

  useEffect(()=>{
    if(usuario?.id_perfil === 2){
      carregarPedidosPorId()
    }else{
      carregar();
    }
    
  }, [])

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={dados} panel={true}/>
    </Card>
  );
}

export default Orders;
