import React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { ListProductsModal } from 'src/components/Modals/ListProductsModal/ListProductsModal';

function PageHeader() {
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
          Lista de Produtos
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, cadastre novos produtos para sua empresa
        </Typography>
      </Grid>
      <Grid item>
      {id_perfil === 3 ? '': <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          style={{backgroundColor: "rgb(18, 80, 130)"}}
          onClick={(e)=>setModal(!modal)
          }
        >
          Cadastrar produto
        </Button>}
      </Grid>
      <ListProductsModal setModal={setModal} openModal={modal} data="" edit={false}/>
    </Grid>
  );
}

export default PageHeader;
