import React from 'react'
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { CategoryModal } from 'src/components/Modals/CategoryModal/CategoryModel';

function PageHeader() {
  const user = {
    name: 'Fernanda',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [modal, setModal] = React.useState<Boolean>(false);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Cadastrar Categorias
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, cadastre novas categorias para os produtos da sua empresa
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
          Cadastrar categoria
        </Button>
      </Grid>
      <CategoryModal setModal={setModal} openModal={modal}/>
    </Grid>
  );
}

export default PageHeader;
