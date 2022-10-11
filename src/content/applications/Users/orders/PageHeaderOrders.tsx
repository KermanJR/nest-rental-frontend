import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React, { useContext } from 'react';
import { ClientsModal } from 'src/components/Modals/ClientsModal/ClientsModal';
import { RegisterOrderModal } from 'src/components/Modals/RegisterOrderModal/RegisterOrderModal';
import { UserContext } from 'src/context/UserContext';

function PageHeaderOrders() {

  const {
    usuario
  } = useContext(UserContext);



  const [modal, setModal] = React.useState<Boolean>(false);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Pedidos
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.id_perfil === 1 && (
            <label>{usuario?.nome}, cadastre novos pedidos da sua empresa.</label>
            )
          }
          {usuario?.id_perfil === 2 && (
           <label>{usuario?.nome}, consulte novos pedidos da sua empresa.</label>
            )
          }
          {usuario?.id_perfil === 3 && (
            <label>{usuario?.nome}, consulte novos pedidos da sua empresa.</label>
            )
          }
          
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeaderOrders;
