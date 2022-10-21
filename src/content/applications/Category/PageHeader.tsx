import React, { useContext } from 'react'
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { CategoryModal } from 'src/components/Modals/CategoryModal/CategoryModel';
import { UserContext } from 'src/context/UserContext';

function PageHeader() {
  

  const [modal, setModal] = React.useState<Boolean>(false);
  const {
    usuario
  }= useContext(UserContext);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Categorias
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.nome}, cadastre novas categorias para os produtos da sua empresa
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
          Cadastrar categoria
        </Button>}
      </Grid>
      
    </Grid>
  );
}

export default PageHeader;
