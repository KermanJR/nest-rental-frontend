import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeaderOrders() {
  const user = {
    name: 'Fernanda',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Pedidos
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, cadastre novos pedidos da sua empresa
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          style={{backgroundColor: "rgb(18, 80, 130)"}}
        >
          Cadastrar pedido
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeaderOrders;
