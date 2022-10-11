import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React, { useContext } from 'react';
import { RegisterOrderModal } from 'src/components/Modals/RegisterOrderModal/RegisterOrderModal';
import { UserContext } from 'src/context/UserContext';
import {useLocation} from 'react-router'

function PageHeader() {


  const {
    usuario
  } = useContext(UserContext);


  const {
    pathname
  } = useLocation();


  const [modal, setModal] = React.useState<Boolean>(false);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Devoluções
        </Typography>
        <Typography variant="subtitle2">
          {usuario?.id_perfil === 1 || usuario?.id_perfil === 3 ?
          <label>{usuario?.nome}, gerencie as devoluções de seus produtos.</label>
          :
          <label>{usuario?.nome}, faça a devolução de seus pedidos.</label>
        }
           
        </Typography>
      </Grid>
      <RegisterOrderModal setModal={setModal} openModal={modal} data="" edit={false}/>
    </Grid>
  );
}

export default PageHeader;
