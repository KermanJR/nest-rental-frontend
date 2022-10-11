import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { BudgetsModal } from 'src/components/Modals/BudgetsModal/BudgetsModal';

function PageHeader() {
  const [modal, setModal] = React.useState<Boolean>(false);
  const {
    usuario
  }= useContext(UserContext);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Orçamentos
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.nome}, faça orçamentos para seus clientes
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

export default PageHeader;
