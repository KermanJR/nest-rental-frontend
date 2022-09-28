import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React from 'react';
import { ClientsModal } from 'src/components/Modals/ClientsModal/ClientsModal';
import { RegisterOrderModal } from 'src/components/Modals/RegisterOrderModal/RegisterOrderModal';

function PageHeaderOrders() {
  const user = {
    name: 'Fernanda',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [modal, setModal] = React.useState<Boolean>(false);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Pedidos
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, cadastre novos pedidos da sua empresa
        </Typography>
      </Grid>
      <Grid item>
      </Grid>
      <RegisterOrderModal setModal={setModal} openModal={modal}/>
    </Grid>
  );
}

export default PageHeaderOrders;
