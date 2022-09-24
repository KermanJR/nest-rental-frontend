import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Clients from './Clients';



function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Vendas - Gerenciar</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            <Clients/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
