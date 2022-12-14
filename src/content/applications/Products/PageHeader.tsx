import React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { ListProductsModal } from 'src/components/Modals/ListProductsModal/ListProductsModal';

function PageHeader() {

  const [modal, setModal] = React.useState<Boolean>(false);
  const {
    usuario
  }= useContext(UserContext);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Lista de Produtos
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.nome}, cadastre novos produtos para sua empresa
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
          Cadastrar produto
        </Button>}
      </Grid>
      <ListProductsModal setModal={setModal} openModal={modal} data="" edit={false}/>
    </Grid>
  );
}

export default PageHeader;
