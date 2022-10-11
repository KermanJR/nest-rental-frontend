import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { BrandsModal } from 'src/components/Modals/BrandsModal/BrandsModal';

function PageHeader() {
  const [modal, setModal] = React.useState<Boolean>(false);

  const {
    usuario
  }= useContext(UserContext);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Marcas
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.nome}, gerencia as marcas dos seus produtos
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
          Cadastrar marca
        </Button>}
      </Grid>
      <BrandsModal data={null} setModal={setModal} openModal={modal} edit={false}/>
    </Grid>
  );
}

export default PageHeader;
