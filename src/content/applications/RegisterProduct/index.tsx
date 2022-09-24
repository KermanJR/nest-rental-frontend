import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import RegisterCategory from './RegisterCategory';


function ApplicationsTransactions() {
  let link = window.location.pathname;
  return (
    <>
      <Helmet>
        <title>Produtos - Gerenciar</title>
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
            <RegisterCategory/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
