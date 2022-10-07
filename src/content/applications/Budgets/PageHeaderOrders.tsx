import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React from 'react';
import { ClientsModal } from 'src/components/Modals/ClientsModal/ClientsModal';
import { RegisterOrderModal } from 'src/components/Modals/RegisterOrderModal/RegisterOrderModal';
import { BudgetsModal } from 'src/components/Modals/BudgetsModal/BudgetsModal';

function PageHeaderOrders() {
  const user = {
    name: 'Fernanda',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [modal, setModal] = React.useState<Boolean>(false);
  const { id_perfil } = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : 0
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Orçamentos
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, faça orçamentos para seus clientes
        </Typography>
      </Grid>
      <Grid item>
      <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          style={{backgroundColor: "rgb(18, 80, 130)"}}
          onClick={(e)=>setModal(!modal)
          }
        >
          Cadastrar orçamento
        </Button>
      </Grid>
      <BudgetsModal data={null} setModal={setModal} openModal={modal} edit={false}/>
    </Grid>
  );
}

export default PageHeaderOrders;
