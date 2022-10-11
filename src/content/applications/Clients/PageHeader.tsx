import { Typography, Button, Grid } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { ClientsModal } from 'src/components/Modals/ClientsModal/ClientsModal';



function PageHeader() {
  const user = {
    name: 'Fernanda',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [modal, setModal] = React.useState<Boolean>(false);
  const {
    usuario
  }= useContext(UserContext);
  
  
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Clientes
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.nome}, gerencie os clientes da sua empresa
        </Typography>
      </Grid>
      <Grid item>
      {usuario?.id_perfil === 3 ? '': <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          style={{backgroundColor: "rgb(18, 80, 130)"}}
          onClick={(e)=>setModal(!modal)
          }
        >
          Cadastrar cliente
        </Button>}
  </Grid>
  <ClientsModal data="" edit={false} setModal={setModal} openModal={modal}/>
    </Grid>
  );
}

export default PageHeader;
