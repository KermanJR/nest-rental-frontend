import { Helmet } from 'react-helmet-async';
import PageHeaderOrders from './PageHeaderOrders';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Brands from './Brands';



function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Marcas - Produtos</title>
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
            <Brands/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
