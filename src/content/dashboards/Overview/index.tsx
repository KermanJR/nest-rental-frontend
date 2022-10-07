import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import WatchList from './WatchList';
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { Navigate } from "react-router-dom";

function DashboardCrypto() {


  const {
    usuario
  } = useContext(UserContext);
  return (

    
      <>
      {usuario?.id_perfil == 1 ? 
      <>
      <Helmet>
        <title>Dashboard - Geral</title>
      </Helmet>
      <PageTitleWrapper>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >

          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      </>
      :
      <>
        <Navigate to="/dashboard/pedidos"/>
      </> 
  }
  </>
    
  );
}

export default DashboardCrypto;
