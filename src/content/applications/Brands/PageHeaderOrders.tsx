import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React from 'react';
import { ClientsModal } from 'src/components/Modals/ClientsModal/ClientsModal';
import { RegisterOrderModal } from 'src/components/Modals/RegisterOrderModal/RegisterOrderModal';
import { BudgetsModal } from 'src/components/Modals/BudgetsModal/BudgetsModal';
import { BrandsModal } from 'src/components/Modals/BrandsModal/BrandsModal';

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
          Marcas
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, gerencia as marcas dos seus produtos
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          style={{backgroundColor: "rgb(18, 80, 130)"}}
          onClick={(e)=>setModal(!modal)}
        >
          Cadastrar marca
        </Button>
      </Grid>
      <BrandsModal data={null} setModal={setModal} openModal={modal} edit={false}/>
    </Grid>
  );
}

export default PageHeaderOrders;
