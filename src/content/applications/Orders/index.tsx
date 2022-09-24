import { Helmet } from 'react-helmet-async';
import PageHeaderOrders from './PageHeaderOrders';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Orders from './Orders';



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
            <Orders/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
