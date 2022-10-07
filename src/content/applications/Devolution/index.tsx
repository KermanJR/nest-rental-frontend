import { Helmet } from 'react-helmet-async';
import PageHeaderOrders from './PageHeaderDevolution';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Devolution from './Devolution';



function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Vendas - Pedidos</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderOrders />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Devolution/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
