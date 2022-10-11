import React from 'react'
import { Typography, Grid } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { CategoryModal } from 'src/components/Modals/CategoryModal/CategoryModel';

function PageHeader() {

  const [modal, setModal] = React.useState<Boolean>(false);
  const {
    usuario
  }= useContext(UserContext);
  
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Frete
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.nome}, consulte as regiões de frete de seus produtos
        </Typography>
      </Grid>
      <Grid item>
      {/*id_perfil === 3 ? '': <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          style={{backgroundColor: "rgb(18, 80, 130)"}}
          onClick={(e)=>setModal(!modal)
          }
        >
          Cadastrar categoria
        </Button>*/}
      </Grid>
      <CategoryModal setModal={setModal} openModal={modal} data="" edit={false}/>
    </Grid>
  );
}

export default PageHeader;
